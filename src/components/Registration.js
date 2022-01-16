import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Registration() {
  let navigate = useNavigate()

  const [form, setForm] = React.useState({
    nickname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${form.nickname}, ${form.email}, ${form.password}`);
    setForm({
      nickname: "",
      email: "",
      password: "",
    });
  };

  const handleBack = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          borderRadius: "16px",
          border: "1px solid black",
          padding: "20px",
          marginTop: "10vh",
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
              id="email"
              label="email"
              value={form.email}
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
            <Button variant="contained" onClick={handleBack} endIcon={<ArrowBackIcon />}>Back</Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Registration;
