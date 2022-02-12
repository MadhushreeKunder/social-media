import axios from "axios";
import { logoutUser } from "./authenticationSlice";

export const setupAuthHeaderForServiceCalls = (token) => {
  console.log("token", token);
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const setupAuthExceptionHandler = (dispatch) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        dispatch(logoutUser());
      }
      return Promise.reject(error);
    }
  );
};

export const setLocalStorage = (sessionDetails) => {
  localStorage?.setItem("session", JSON.stringify(sessionDetails));
};

export const getLocalStorage = () => {
  const defaultValues = {
    token: "",
    name: "",
    userName: "",
    userId: "",
    avatar: "",
  };

  return JSON.parse(localStorage.getItem("session")) || defaultValues;
};

export const updateSessionDetailsInLocalStorage = (avatar) => {
  const userDetails = JSON.parse(localStorage?.getItem("session"));
  userDetails.avatar = avatar;
  localStorage?.setItem("session", JSON.stringify(userDetails));
};
