"use client";

import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import useHydrate from "@/hooks/useHydrate";
import { User } from "@supabase/supabase-js";

const AuthUI = () => {
  const [user, setUser] = useState<User>();
  const supabase = createSupabaseBrowserClient();
  const isMount = useHydrate();

  const getUserInfo = async () => {
    const result = await supabase.auth.getUser();
    console.log(result);
    if (result.data.user) setUser(result.data.user);
  };

  const handleLogout = async () => {
    supabase.auth.signOut();
    window.location.reload();
  };

  // Oauth 커스텀을 하려면 아래 핸들러를 바인딩하면 된다.
  // const handleGoogleLogin = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
  //     },
  //   });
  // };

  // const handleGithubLogin = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: "github",
  //     options: {
  //       redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
  //     },
  //   });
  // };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!isMount) return null;

  return (
    <section className="w-full p-10">
      <div>{user ? `로그인 됨 ${user.email}` : "로그아웃"}</div>
      <>
        {user && (
          <button onClick={handleLogout} className="border-2 border-black">
            로그아웃
          </button>
        )}
      </>
      <div className="mx-auto max-w-[500px]">
        <Auth
          redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}
          supabaseClient={supabase as any}
          appearance={{ theme: ThemeSupa }}
          onlyThirdPartyProviders={true}
          providers={["google", "github"]}
        />
      </div>
    </section>
  );
};

export default AuthUI;
