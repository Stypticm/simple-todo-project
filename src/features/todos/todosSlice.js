import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isLoading: false,
  error: '',
  todos: [],
}

export const todosSlice = createSlice({
  name: 'todolist',
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
  },
})

export const { setError, setTodos, setLoading } = todosSlice.actions

export const todosSelector = (state) => state.todos

// fetch all
export const fetchTodos = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    axios.get("http://localhost:5000/todos").then((response) => {
      dispatch(setTodos(response.data));
    });
  } catch (error) {
    dispatch(setError());
  }
};

export default todosSlice.reducer

