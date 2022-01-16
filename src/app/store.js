import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../features/todos/todosSlice'
import usersSlice from '../features/users/usersSlice'

export const store = configureStore({
  reducer: {
      todos: todosReducer,
      users: usersSlice
  },
})