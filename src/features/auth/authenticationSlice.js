import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { Backend_URL } from "../utils";
import { getLocalStorage } from "./utils";



export const signupButtonClicked = createAsyncThunk(
  "authenticate/signupButtonClicked",
  async (userDetails, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios.post(`${Backend_URL}/social-profiles/signup`, {
        ...userDetails,
      });

      return response;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const loginButtonClicked = createAsyncThunk(
  "authenticate/loginButtonClicked",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "POST",
        url: `${Backend_URL}/social-profiles/login`,
        headers: { email, password },
      });
      return { userDetails: response };
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAction("authentication/logoutUser");

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    authentication: getLocalStorage(),
    signUp: {
      signUpStatus: "idle",
      signUpError: "",
    },
    notifications: [],
  },
  reducers: {},
  extraReducers: {
    [logoutUser]: (state) => {
      Object.assign(state.authentication, {
        token: "",
        name: "",
        userName: "",
        avatar: "",
        userId: "",
      });
      state.notifications = [];
      localStorage?.removeItem("session");
    },

    [signupButtonClicked.pending]: (state, action) => {
      state.signUp.signUpStatus = "loading";
    },

    [signupButtonClicked.fulfilled]: (state, action) => {
      state.signUp.signUpStatus = "success";
    },

    [signupButtonClicked.rejected]: (state, action) => {
      state.signUp.signUpStatus = "error";
      state.signUp.signUpError = action.payload;
    },
  },
});

export default authenticationSlice.reducer;
export const useAuthentication = () => {
  useSelector((state) => state.authentication);
};
