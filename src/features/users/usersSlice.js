import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const usersSlice = createSlice({
  name: "allUsers",
  initialState: {
    isLoading: false,
    error: false,
    users: [],
    isAuth: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
      state.error = false;
    },
    setError: (state) => {
      state.isLoading = false;
      state.error = true;
      state.isAuth = false;
    },
    setAuth: (state) => {
      state.isLoading = false;
      state.error = false;
      state.isAuth = true;
    },
    setLogOut: (state) => {
      state.isLoading = false;
      state.error = false;
      state.isAuth = false;
      state.users = []
    },
  },
});

export const { setError, setUsers, setLoading, setAuth, setLogOut } =
  usersSlice.actions;

export const usersSelector = (state) => state;

// fetch all
export const fetchUsers = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    axios.get("http://localhost:5000/users").then((response) => {
      dispatch(setUsers(response.data)); 
    });
  } catch (error) {
    dispatch(setError());
  }
};

// find user
export const checkUsers = (email, password) => async (dispatch) => {
  dispatch(setLoading());
  try {
    axios
      .post(`http://localhost:5000/users/one/${email}-${password}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setUsers(res.data.user._id))
          dispatch(setAuth());
        } else {
          console.log(res.status);
        }
      });
  } catch (error) {
    dispatch(setError());
  }
};

// registration
export const regUser = (nickname, email, password) => async (dispatch) => {
  dispatch(setLoading());
  try {
    axios
      .post("http://localhost:5000/users/add", {
        "nickname": nickname,
        "email": email,
        "password": password,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setUsers(res.data.newUser._id))
          dispatch(setAuth());
        } else {
          if (res.status === 204 || res.status === 409) {
            dispatch(setError())
          }
        }
      });
  } catch (error) {
    dispatch(setError());
  }
};

export default usersSlice.reducer;
