import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk'
import todosReducer from "../features/todos/todosSlice";
import usersSlice from "../features/users/usersSlice";

const reducers = combineReducers({
  todos: todosReducer,
  users: usersSlice,
});

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export default store