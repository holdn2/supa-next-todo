import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";
import { getCookie, setCookie } from "cookies-next";

// RouterHandler(서버의 REST API), RSC, Middleware, ServerActions
// ServerActions / RouterHandler (서버 클라이언트에서 사용하는 쿠키 설정)
export const createServerSideClient = async (serverComponent = false) => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key: string) => cookieStore.get(key)?.value,
        set: (key: string, value: string, options: CookieOptions) => {
          if (serverComponent) return;
          cookieStore.set(key, value, options);
        },
        remove: (key: string, options: CookieOptions) => {
          if (serverComponent) return;
          cookieStore.set(key, "", options);
        },
      },
    },
  );
};

// RSC (쿠키 조작 못함)
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true);
};

// Middleware
export const createServerSideMiddleware = async (
  req: NextRequest,
  res: NextResponse,
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key: string) => getCookie(key, { req, res }),
        set: (key: string, value: string, options: CookieOptions) => {
          setCookie(key, value, { req, res, ...options });
        },
        remove: (key: string, options: CookieOptions) => {
          setCookie(key, "", { req, res, ...options });
        },
      },
    },
  );
};
