import { createServerSideClient } from "@/lib/supabase";
import { Tables } from "@/types/supabase";

export const getUser = async ({ serverComponent = false }) => {
  const supabase = await createServerSideClient(serverComponent);
  const user = await supabase.auth.getUser();

  return user?.data?.user;
};

export const getProfileById = async ({
  serverComponent = false,
  userId = "",
}): Promise<Tables<"profiles"> | null> => {
  const supabase = await createServerSideClient(serverComponent);
  const profile = await supabase.from("profiles").select("*").eq("id", userId);

  if (!profile.data) return null;

  return profile?.data?.[0];
};
