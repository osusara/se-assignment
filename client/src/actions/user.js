import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_TODOS,
} from "./types";
import setAuthToken from "../util/setAuthToken";

// load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/user");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = ({ username, password }) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, password });

    try {
      const res = await axios.post("/api/user/register", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login user
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post("/api/user/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_TODOS });
  dispatch({ type: LOGOUT });
};
