import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, todosSelector } from "../features/todos/todosSlice";
import PageError from "./PageError";
import PageLoading from "./PageLoading";

function TodoList() {
  const { todos, loading, error } = useSelector(todosSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const renderTodos = () => {
    if (loading) return <PageLoading />;
    if (error) return <PageError />;
    if (todos.length === 0) return <p>Todos не найдены</p>;

    return todos.map((todos) => (
      <li key={todos._id} style={{ listStyle: "none" }}>
        {todos.title}
      </li>
    ));
  };

  return <div>{renderTodos()}</div>;
}

export default TodoList;
