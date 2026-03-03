"use client";

import React from "react";
import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";

interface TodoContainerProps {
  sharedUserFullName?: string;
  ownerUserId?: string;
}

const TodoContainer = ({
  sharedUserFullName,
  ownerUserId,
}: TodoContainerProps) => {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
  } = useTodosController(ownerUserId);

  return (
    <div>
      <TodoList
        sharedUserFullName={sharedUserFullName}
        ownerUserId={ownerUserId}
        loading={loading}
        todoListData={todos}
        isReadOnly
        onUpdate={onUpdateTodos}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div>
  );
};

export default TodoContainer;
