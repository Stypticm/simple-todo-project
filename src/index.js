import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Registration from "./components/Registration";
import PageError from "./components/PageError";
import TodoList from "./components/TodoList";

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/" element={<Auth />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/404" element={<PageError />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
