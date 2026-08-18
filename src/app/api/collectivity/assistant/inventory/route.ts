import "server-only";

import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { z } from "zod";

import { hasUserProductAccess } from "@/lib/auth/profile";
import { getServerSession } from "@/lib/auth/session";
import { createAIFormOperationSchema } from "@/app/[locale]/collectivity/[planId]/inventory/InventorySchema";

export const runtime = "nodejs";

const textPartSchema = z.object({
  type: z.literal("text"),
  text: z.string().min(1).max(4_000),
});

const messageSchema = z
  .object({
    id: z.string().min(1).max(128),
    role: z.enum(["user", "assistant"]),
    parts: z.array(textPartSchema).min(1).max(4),
  })
  .passthrough();

const catalogDimensionSchema = z
  .object({
    key: z.string().min(1).max(128),
    kind: z.enum(["year", "integer", "string", "enum"]),
    allowedValues: z.array(z.string().min(1).max(256)).max(256).optional(),
    allowedValueLabels: z.record(z.string().min(1).max(256)).optional(),
  })
  .strict();

const proposedOperationArgumentsSchema = z
  .object({
    operation: z.unknown(),
  })
  .strict();

const proposeInventoryOperationTool = {
  type: "function" as const,
  name: "propose_inventory_operation",
  description:
    "Propose one inventory field update when the user has provided a value that maps to the approved catalog. This only proposes a change; it never applies one.",
  strict: true,
  parameters: {
    type: "object",
    additionalProperties: false,
    required: ["operation"],
    properties: {
      operation: {
        type: "object",
        additionalProperties: false,
        required: ["type", "fieldId", "dimensions", "value", "unit"],
        properties: {
          type: { type: "string", enum: ["setField"] },
          fieldId: { type: "string" },
          dimensions: {
            type: "object",
            additionalProperties: { type: ["string", "number"] },
          },
          value: { type: ["string", "number"] },
          unit: { type: ["string", "null"] },
          confidence: { type: "string", enum: ["low", "medium", "high"] },
          evidence: { type: "array" },
        },
      },
    },
  },
};

const catalogFieldSchema = z
  .object({
    datasetKey: z.string().min(1).max(128),
    id: z.string().min(1).max(256),
    label: z.string().min(1).max(512),
    description: z.string().min(1).max(1_000),
    valueType: z.enum(["number", "string"]),
    expectedUnit: z.union([z.string().max(128), z.array(z.string().max(128)).max(16), z.null()]),
    unitByDimension: z
      .record(
        z.record(z.union([z.string().max(128), z.array(z.string().max(128)).max(16), z.null()]))
      )
      .optional(),
    dimensions: z.array(catalogDimensionSchema).max(16),
    aliases: z.array(z.string().min(1).max(256)).max(64),
  })
  .strict();

const requestSchema = z.object({
  id: z.string().min(1).max(128),
  messages: z.array(messageSchema).min(1).max(12),
  trigger: z.enum(["submit-message", "regenerate-message"]),
  messageId: z.string().min(1).max(128).optional(),
  catalog: z.array(catalogFieldSchema).min(1).max(128),
});

type InventoryAssistantRequest = z.infer<typeof requestSchema>;

function errorResponse(
  status: number,
  code:
    | "unauthorized"
    | "forbidden"
    | "invalid_request"
    | "missing_configuration"
    | "upstream_error",
  message: string
) {
  return NextResponse.json({ error: { code, message } }, { status });
}

function buildInput(messages: InventoryAssistantRequest["messages"]) {
  return messages
    .map((message) => {
      const content = message.parts.map((part) => part.text).join("\n");
      const speaker = message.role === "user" ? "User" : "Assistant";

      return `${speaker}: ${content}`;
    })
    .join("\n\n");
}

function buildInstructions(catalog: z.infer<typeof requestSchema>["catalog"]) {
  return [
    "You are a helpful assistant for an inventory data-entry application.",
    "The following catalog contains every approved inventory field the assistant may reference.",
    "Use its labels, descriptions, units, dimensions, and aliases to understand source data.",
    "When you can identify one supported inventory value, call propose_inventory_operation.",
    "The tool only proposes a change; do not claim to modify inventory data or files.",
    "Do not mention or infer application field paths.",
    "Respond in the same language the user uses when that language is clear.",
    "Active dataset catalog:",
    JSON.stringify(catalog),
  ].join("\n\n");
}

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session.authenticated || !session.user) {
    return errorResponse(401, "unauthorized", "Authentication required");
  }

  if (!hasUserProductAccess(session.user, "collectivity")) {
    return errorResponse(403, "forbidden", "Collectivity access required");
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "invalid_request", "Invalid JSON request body");
  }

  const parsedRequest = requestSchema.safeParse(body);

  if (!parsedRequest.success) {
    return errorResponse(400, "invalid_request", "Invalid assistant request");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const baseURL = process.env.OPENAI_BASE_URL;
  const model = process.env.OPENAI_MODEL;

  if (!apiKey || !baseURL || !model) {
    return errorResponse(503, "missing_configuration", "AI service is not configured");
  }

  const client = new OpenAI({ apiKey, baseURL });
  const operationSchema = createAIFormOperationSchema(parsedRequest.data.catalog);

  let response;

  try {
    response = await client.responses.create(
      {
        model,
        instructions: buildInstructions(parsedRequest.data.catalog),
        input: buildInput(parsedRequest.data.messages),
        tools: [proposeInventoryOperationTool],
        stream: true,
      },
      { signal: request.signal }
    );
  } catch {
    return errorResponse(502, "upstream_error", "AI service request failed");
  }

  const stream = createUIMessageStream({
    originalMessages: parsedRequest.data.messages,
    onError: () => "AI response stream failed",
    async execute({ writer }) {
      const textId = "assistant-text";

      writer.write({ type: "text-start", id: textId });

      try {
        for await (const event of response) {
          if (event.type === "response.output_text.delta") {
            writer.write({ type: "text-delta", id: textId, delta: event.delta });
          }

          if (
            event.type === "response.function_call_arguments.done" &&
            event.name === "propose_inventory_operation"
          ) {
            let argumentsPayload: unknown;

            try {
              argumentsPayload = JSON.parse(event.arguments);
            } catch {
              continue;
            }

            const argumentsResult = proposedOperationArgumentsSchema.safeParse(argumentsPayload);
            const operationResult =
              argumentsResult.success && operationSchema.safeParse(argumentsResult.data.operation);

            if (operationResult && operationResult.success) {
              writer.write({
                type: "tool-input-available",
                toolCallId: event.item_id,
                toolName: event.name,
                input: operationResult.data,
              });
            }
          }
        }
      } finally {
        writer.write({ type: "text-end", id: textId });
      }
    },
  });

  return createUIMessageStreamResponse({ stream });
}
