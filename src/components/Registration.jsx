import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Slide from "@mui/material/Slide";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { regUser, setLogOut } from "../features/users/usersSlice";

function Registration() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.error);
  const isAuth = useSelector((state) => state.users.isAuth);

  const [form, setForm] = React.useState({
    nickname: "",
    email: "",
    password: "",
  });

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(regUser(form.nickname, form.email, form.password));
    setForm({
      nickname: "",
      email: "",
      password: "",
    });
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  React.useEffect(() => {
    if (isAuth) navigate("/todolist");
  }, [isAuth, navigate]);

  return (
    <>
      {error ? (
        <Dialog
          open={error}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => dispatch(setLogOut())}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              This email busy or you didn't fill the field
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(setLogOut())}>Close</Button>
          </DialogActions>
        </Dialog>
      ) : (
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
                  inputProps={{
                    minLength: 6,
                  }}
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
                      email: e.target.value,
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
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<SendIcon />}
                >
                  Sign up
                </Button>
                <Button
                  variant="contained"
                  onClick={handleBack}
                  endIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Registration;
