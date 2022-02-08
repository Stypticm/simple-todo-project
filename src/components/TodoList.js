import React from "react";
import "./todolist.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  addTodo,
  todosSelector,
  deleteTodo,
  editTodo,
} from "../features/todos/todosSlice";
import PageError from "./PageError";
import PageLoading from "./PageLoading";
import {
  AppBar,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUserNickname, setLogOut } from "../features/users/usersSlice";
import moment from "moment";

function TodoList() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { todos, loading, error } = useSelector(todosSelector);
  const isAuth = useSelector((state) => state.users.isAuth);
  const userId = useSelector((state) => state.users.users);
  const nickname = useSelector((state) => state.users.nickname);

  const [openAddW, setOpenAddW] = React.useState(false);
  const [openEditW, setOpenEditW] = React.useState(false);
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    date: "",
  });

  React.useEffect(() => {
    dispatch(fetchUserNickname(userId));
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    dispatch(fetchTodos(userId));

    if (!isAuth) navigate("/");
  }, [dispatch, navigate, userId, isAuth]);

  const memoTodos = React.useMemo(() => [...todos], [todos]);

  const handleBack = (e) => {
    e.preventDefault();
    dispatch(setLogOut());
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    setForm({
      title: "",
      description: "",
      date: "",
    });
    setOpenAddW(true);
  };

  const handleCloseWindow = (e) => {
    e.preventDefault();
    setForm({
      title: "",
      description: "",
      date: "",
    });
    setOpenAddW(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(userId, form.title, form.description, form.date));
    setForm({
      title: "",
      description: "",
      date: "",
    });
    setOpenAddW(false);
  };

  const handleSaveEdited = (e) => {
    e.preventDefault();
    setOpenEditW(false);
  };

  const handleEditTodo = (item) => {
    let currentDate = moment(item.date).format("YYYY-MM-DD");
    setForm({
      title: item.title,
      description: item.description,
      date: currentDate,
      objId: item.objId,
      id: item._id,
    });
    setOpenEditW(true);
  };

  const saveEditedData = (e) => {
    e.preventDefault();
    dispatch(
      editTodo(userId, form.title, form.description, form.date, form.id)
    );
    setOpenEditW(false);
  };

  const renderTodos = () => {
    if (loading) return <PageLoading />;
    if (error) return <PageError />;
    if (memoTodos.length === 0)
      return (
        <Typography variant="h4" component="div">
          You don't have todos
        </Typography>
      );

    return memoTodos.map((item) => (
      <Grid item xs={12} md={6} key={item._id}>
        <Card sx={{ bgcolor: "text.disabled", borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h4" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" component="div">
              {item.description}
            </Typography>
            <Typography variant="body2" component="div">
              {moment(item.date).format("DD-MM-YYYY")}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <IconButton
              size="small"
              color="warning"
              sx={{ mr: 2 }}
              onClick={() => dispatch(deleteTodo(item._id, userId))}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              size="small"
              color="success"
              sx={{ mr: 2 }}
              onClick={() => handleEditTodo(item)}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Add dialog window */}
      <Dialog open={openAddW} onClose={handleCloseWindow}>
        <form onSubmit={handleSubmit}>
          <DialogTitle alignSelf="center">Create new todo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title todo"
              variant="standard"
              focused={true}
              sx={{ display: "flex", mb: "1rem" }}
              value={form.title}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description todo"
              multiline
              rows={4}
              variant="standard"
              sx={{ display: "flex" }}
              value={form.description}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="date"
              type="date"
              variant="standard"
              sx={{ display: "flex", mt: "2rem" }}
              value={form.date}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  date: e.target.value,
                }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Edit dialog window */}
      <Dialog open={openEditW} onClose={handleSaveEdited}>
        <form onSubmit={saveEditedData}>
          <DialogTitle alignSelf="center">Edit todo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title todo"
              variant="standard"
              focused={true}
              sx={{ display: "flex", mb: "1rem" }}
              value={form.title}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description todo"
              multiline
              rows={4}
              variant="standard"
              sx={{ display: "flex" }}
              value={form.description}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="date"
              type="date"
              variant="standard"
              sx={{ display: "flex", mt: "2rem" }}
              value={form.date}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  date: e.target.value,
                }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
      <AppBar position="static">
        <Toolbar>
          <Container sx={{ display: "flex" }}>
            <IconButton
              size="large"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={handleBack}
            >
              <LogoutIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ alignSelf: "center" }}
            >
              {nickname}
            </Typography>
          </Container>
          <Container>
            <IconButton color="inherit" edge="end" onClick={handleAddTodo}>
              <AddCircleIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Grid container sx={{ mt: 2 }} spacing={2}>
          {renderTodos()}
        </Grid>
      </Container>
    </Box>
  );
}

export default TodoList;
