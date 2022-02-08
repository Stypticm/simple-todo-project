import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: "",
  todos: [],
  status: "",
};

export const todosSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setTodos: (state, { payload }) => {
      state.todos = payload;
      state.isLoading = false;
      state.error = false;
    },
    setError: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { setError, setTodos, setLoading, setStatus } = todosSlice.actions;

export const todosSelector = (state) => state.todos;

// fetch all
export const fetchTodos = (userId) => (dispatch) => {
  try {
    axios.get(`http://localhost:5000/todos/${userId}`).then((response) => {
      const data = response.data;
      const result = data.filter((item) => item.objId === userId);
      if (data.length === 0) {
        dispatch(setTodos([]));
      } else {
        dispatch(setTodos(result));
      }
    });
  } catch (error) {
    dispatch(setError());
  }
};

// add todo
export const addTodo = (userId, title, description, date) => (dispatch) => {
  dispatch(setLoading());
  try {
    axios
      .post(`http://localhost:5000/todos/add/${userId}`, {
        title: title,
        description: description,
        date: date,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(fetchTodos(userId));
          dispatch(setStatus(res.status));
        } else {
          dispatch(setError());
        }
      });
  } catch (error) {
    dispatch(setError());
  }
};

// delete todo
export const deleteTodo = (idTodo, userId) => (dispatch) => {
  dispatch(setLoading());
  try {
    axios.delete(`http://localhost:5000/todos/${idTodo}`).then(() => {
      dispatch(fetchTodos(userId));
    });
  } catch (error) {
    dispatch(setError());
  }
};

export const editTodo =
  (userId, title, description, date, id) => async (dispatch) => {
    dispatch(setLoading());
    try {
      axios.put(`http://localhost:5000/todos/update/${id}`, {
        title: title,
        description: description,
        date: date,
        objId: userId
      }).then(() => {
        dispatch(fetchTodos(userId))
      })
    } catch (error) {
      dispatch(setError());
    }
  };

export default todosSlice.reducer;
