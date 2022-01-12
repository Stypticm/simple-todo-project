import React from "react";
import { TextField, Button, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function Registration() {
  const [form, setForm] = React.useState({
    nickname: "",
    login: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${form.nickname}, ${form.login}, ${form.password}`);
    setForm({
      nickname: "",
      login: "",
      password: "",
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          borderRadius: "16px",
          border: "1px solid black",
          padding: "20px",
          marginTop: "20vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <TextField
              helperText="Please enter your nickname"
              id="nickname"
              label="nickname"
              value={form.nickname}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  nickname: e.target.value,
                }))
              }
            />
            <TextField
              helperText="Please enter your login"
              id="login"
              label="login"
              value={form.login}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  login: e.target.value,
                }))
              }
            />
            <TextField
              helperText="Please enter your password"
              id="password"
              label="password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
            <Button variant="contained" type="submit" endIcon={<SendIcon />}>
              Sign up
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Registration;
