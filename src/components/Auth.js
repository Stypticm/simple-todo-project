import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

function Auth() {
  const [form, setForm] = React.useState({
    login: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${form.login}, ${form.password}`);
    setForm({
      login: "",
      password: "",
    });
  };

  return (
    <div className="main_container">
      <Stack spacing={10}>
        <TextField
          id="login"
          label="Login"
          variant="standard"
          color="success"
          onChange={(e) => {
            setForm((prevState) => ({
              ...prevState,
              login: e.target.value,
            }));
          }}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          color="success"
          onChange={(e) => {
            setForm((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
          }}
        />
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={5}>
            <Button variant="contained" type="submit">
              Sign In
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
        </form>
      </Stack>
    </div>
  );
}

export default Auth;
