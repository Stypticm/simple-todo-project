import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

import "./App.css";

function App() {
  return (
    <div className="main_container">
      <Stack spacing={10}>
        <TextField
          id="standard-basic"
          label="Login"
          variant="standard"
          color="success"
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          color="success"
        />
        <Stack direction="row" spacing={5}>
          <Button variant="contained">
            <Link
              to="/authentication"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign In
            </Link>
          </Button>
          <Button variant="contained">
            <Link
              to="/registration"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign Up
            </Link>
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
