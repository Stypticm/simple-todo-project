import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Registration from "./components/Registration";
import PageError from "./components/PageError";
import Administrator from "./components/Administrator";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/authentication" element={<Auth />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/404" element={<PageError />} />
      <Route path="/administrator" element={<Administrator />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.register();
