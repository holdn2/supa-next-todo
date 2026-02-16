"use client";

import { type TodoDto } from "@/app/todo-no-rls/hooks/useTodosController";
import React, { useState } from "react";
import { IoShareSocialOutline, IoSearchOutline } from "react-icons/io5";
import { useCopyToClipboard } from "usehooks-ts";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  sharedUserFullName: string;
  ownerUserId: string;
  loading: boolean;
  todoListData: TodoDto[] | null;
  isReadOnly: boolean;
  onUpdate: (id: number, content: string) => void;
  onCreate: () => void;
  onDelete: (id: number) => void;
  onSearch: (terms: string) => void;
}

const TodoList = ({
  sharedUserFullName = "",
  ownerUserId = "",
  loading = false,
  todoListData = [],
  isReadOnly = false,
  onUpdate,
  onCreate,
  onDelete,
  onSearch,
}: TodoListProps) => {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = () => {
    const shareLink = `${"todoList 공유 링크"}/share/${ownerUserId}`;
    copy(shareLink)
      .then(() => {
        window.alert(`공유 링크 복사 완료!\n${shareLink}`);
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  const handleSearchEnd = () => {
    onSearch(userSearchInput);
    setUserSearchInput("");
  };

  return (
    <section className="min-h-[70dvh] bg-[#69cfcf]">
      <div className="m-auto w-full max-w-[800px] p-[20px]">
        <article className="flex flex-row justify-between items-center">
          <div className="font-bold text-[32px]">
            {sharedUserFullName && <div>{sharedUserFullName}</div>}Things to do:
          </div>
          {ownerUserId && (
            <div
              onClick={() => handleCopy()}
              className="font-bold text-[20px] flex flex-row items-center cursor-pointer"
            >
              Share
              <IoShareSocialOutline />
            </div>
          )}
        </article>
        {!isReadOnly && (
          <article className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex flex-1">
              <input
                value={userSearchInput}
                onChange={(e) => setUserSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchEnd();
                  }
                }}
                className="p-4 flex-1 bg-[#f7cb66] border border-black rounded-l-2xl font-bold cursor-pointer"
                type="text"
              ></input>
              <div
                onClick={handleSearchEnd}
                className="w-[60px] flex justify-center items-center bg-black rounded-r-2xl"
              >
                <IoSearchOutline size={40} color="#fff" />
              </div>
            </div>
            <div
              onClick={onCreate}
              className="h-[60px] w-[200px] flex justify-center items-center bg-[#7ebb95] border border-black rounded-2xl font-bold cursor-pointer text-[20px]"
            >
              New Task
            </div>
          </article>
        )}

        <div className="h-[2px] my-10 bg-black" />
        {todoListData && todoListData.length >= 1 ? (
          <ul className="flex flex-col gap-6">
            {(todoListData ?? []).map((todo) => {
              return (
                <TodoListItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              );
            })}
          </ul>
        ) : (
          <div>{loading ? "Loading..." : "Empty!"}</div>
        )}
      </div>
    </section>
  );
};

export default TodoList;
