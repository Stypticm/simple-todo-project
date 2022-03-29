import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkUsers, fetchUsers } from "../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import "./authPage.css";

const Auth = () => {
  console.log("auth");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.users.isAuth);

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleChangeEmail = (e) => {
    setForm((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const handleChangePassword = (e) => {
    setForm((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const onOptimisedHandleChangeEmail = debounce(handleChangeEmail, 500);

  const onOptimisedHandleChangePassword = debounce(handleChangePassword, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkUsers(form.email, form.password));
    setForm({
      email: "",
      password: "",
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/registration");
  };

  React.useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line
  }, []);

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
          defaultValue={form.email}
          type="search"
          onChange={onOptimisedHandleChangeEmail}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          color="success"
          defaultValue={form.password}
          onChange={onOptimisedHandleChangePassword}
        />
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={5}>
            <Button variant="contained" type="submit">
              Sign In
            </Button>
            <Button variant="contained" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default Auth;
