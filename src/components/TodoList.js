import React from "react";
import "./todolist.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, todosSelector } from "../features/todos/todosSlice";
import PageError from "./PageError";
import PageLoading from "./PageLoading";
import {
  Button,
  Box,
  Stack,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { setLogOut } from "../features/users/usersSlice";

function TodoList() {
  const { todos, loading, error } = useSelector(todosSelector);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const isAuth = useSelector((state) => state.users.isAuth);

  React.useEffect(() => {
    dispatch(fetchTodos());
    if (!isAuth) navigate("/");
  }, [dispatch, isAuth, navigate]);

  const renderTodos = () => {
    if (loading) return <PageLoading />;
    if (error) return <PageError />;
    if (todos.length === 0) return <PageLoading />;

    return todos.map((todos) => (
      <Card key={todos._id}>
        <CardContent>
          <Typography variant="h5" component="div">
            {todos.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Delete</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    ));
  };

  const handleBack = (e) => {
    e.preventDefault();
    dispatch(setLogOut());
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Stack>
        {renderTodos()}
        <Button variant="contained" onClick={handleBack} sx={{ marginTop: "10vh" }}>
          Logout
        </Button>
      </Stack>
    </Box>
  );
}

export default TodoList;
