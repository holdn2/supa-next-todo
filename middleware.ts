import { NextRequest, NextResponse } from "next/server";

const COOKIE_COUNTER = "cookie-counter";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  console.log("middleware 통과!");

  if (request.cookies.get(COOKIE_COUNTER)) {
    const prev = request.cookies.get(COOKIE_COUNTER)?.value;
    response.cookies.set(COOKIE_COUNTER, `${Number(prev) + 1}`);
  } else {
    response.cookies.set(COOKIE_COUNTER, "1");
  }
  return response;
}

export const config = {
  // matcher에 해당하는 경로만 middleware를 통과한다.
  matcher: ["/", "/todo-no-rls", "/api/:path*"],
};
