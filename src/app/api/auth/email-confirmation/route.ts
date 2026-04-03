import { confirmEmail } from "@/lib/auth/strapi";
import { sessionResponse, strapiErrorResponse } from "@/lib/auth/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await confirmEmail(body);
    return sessionResponse(session);
  } catch (error) {
    return strapiErrorResponse(error);
  }
}
