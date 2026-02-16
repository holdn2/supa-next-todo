"use client";

import { createSupabaseClient } from "@/lib/client/supabase";

// todoList 가져오기
export const getTodos = async () => {
  const supabase = createSupabaseClient();
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .order("id", {
      ascending: false,
    });

  return result.data;
};

// todoList 가져오기 + by Id
export const getTodosById = async (id: number) => {
  const supabase = createSupabaseClient();
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id);

  return result.data;
};

// todoList 가져오기 + search
export const getTodosBySearch = async (terms: string) => {
  const supabase = createSupabaseClient();
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null)
    .ilike("content", `%${terms}%`)
    .order("id", { ascending: false })
    .limit(500);

  return result.data;
};

// todoList 생성하기
export const createTodos = async (content: string) => {
  const supabase = createSupabaseClient();
  const result = await supabase
    .from("todos_no_rls")
    .insert({
      content,
    })
    .select();

  return result.data;
};

// todoList 업데이트하기
export const updateTodos = async (id: number, content: string) => {
  const supabase = createSupabaseClient();
  const result = await supabase
    .from("todos_no_rls")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  return result.data;
};

// todoList softDelete
export const deleteTodosSoft = async (id: number) => {
  const supabase = createSupabaseClient();
  const result = await supabase
    .from("todos_no_rls")
    .update({
      updated_at: new Date().toISOString(),
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  return result.data;
};

// todoList hardDelete - hard delete는 최대한 피하는 것이 좋다.
// export const deleteTodosHard = async (id: number) => {
//   const supabase = createSupabaseClient();
//   const result = await supabase.from("todos_no_rls").delete().eq("id", id);

//   return result.data;
// };
