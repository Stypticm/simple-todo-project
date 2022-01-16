import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkUsers } from "../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import "./authPage.css";

const Auth = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const isAuth = useSelector((state) => state.users.isAuth);

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkUsers(form.email, form.password));
    setForm({
      email: "",
      password: "",
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault()
    navigate('/registration')
  }

  React.useEffect(() => {
    if (isAuth) navigate("/todolist");
  }, [isAuth, navigate]);

  return (
    <div className="main_container">
      <Stack spacing={10}>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          color="success"
          value={form.email}
          onChange={(e) => {
            setForm((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          color="success"
          value={form.password}
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
            <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default Auth;
