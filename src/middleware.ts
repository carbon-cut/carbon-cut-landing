// middleware.ts
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { chain } from "@/middlewares/chain";
import { withI18nMiddleware } from "@/middlewares/withI18nMiddleware";
import { withAuthMiddleware } from "@/middlewares/withAuthMiddleware";

const middlewareChain = chain([withI18nMiddleware, withAuthMiddleware]);

function getHouseholdRedirectPath(pathname: string) {
  if (pathname.startsWith("/fr/household/")) {
    return "/fr/household";
  }

  if (pathname.startsWith("/household/")) {
    return "/household";
  }

  return null;
}

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  const redirectPath = getHouseholdRedirectPath(request.nextUrl.pathname);

  if (redirectPath) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return middlewareChain(request, event, NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
