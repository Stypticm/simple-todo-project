import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Registration from "./components/Registration";
import PageError from "./components/PageError";
import Administrator from "./components/Administrator";
import TodoList from "./components/TodoList";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/registration" element={<Registration />} />
        <Route path="/404" element={<PageError />} />
        <Route path="/administrator" element={<Administrator />} />
        <Route path="/todolist" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
