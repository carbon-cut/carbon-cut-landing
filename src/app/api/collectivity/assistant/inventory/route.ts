import "server-only";

import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { z } from "zod";

import { hasUserProductAccess } from "@/lib/auth/profile";
import { getServerSession } from "@/lib/auth/session";

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
    allowedValues: z.array(z.string().min(1).max(256)).max(256).optional(),
    allowedValueLabels: z.record(z.string().min(1).max(256)).optional(),
  })
  .strict();

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
    "Do not mention or infer application field paths, and do not claim to modify inventory data or files.",
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

  let response;

  try {
    response = await client.responses.create(
      {
        model,
        instructions: buildInstructions(parsedRequest.data.catalog),
        input: buildInput(parsedRequest.data.messages),
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
        }
      } finally {
        writer.write({ type: "text-end", id: textId });
      }
    },
  });

  return createUIMessageStreamResponse({ stream });
}
