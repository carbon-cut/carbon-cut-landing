import type { operations } from "@/generated/backend-api";

export type ContactRequest =
  operations["sendContactMessage"]["requestBody"]["content"]["application/json"];

type ContactResponse =
  operations["sendContactMessage"]["responses"][200]["content"]["application/json"];

export async function sendContactMessage(values: ContactRequest): Promise<ContactResponse> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(values),
  });
  const payload = (await response.json().catch(() => null)) as ContactResponse | null;

  if (!response.ok || !payload) throw new Error("Contact request failed");
  return payload;
}
