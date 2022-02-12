import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Backend_URL } from '../utils';
import { setupAuthHeaderForServiceCalls } from './utils';
import { setLocalStorage } from './utils';
import { getLocalStorage } from './utils';

export const signupButtonClicked = createAsyncThunk(
  'authenticate/signupButtonClicked',
  async (userDetails, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: 'POST',
        url: `${Backend_URL}/social-profiles/signup`,
        data: { ...userDetails },
      });

      console.log('here1', response);

      return response;
    } catch (error) {
      console.log('here', error.response.data.message);
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const loginButtonClicked = createAsyncThunk(
  'authenticate/loginButtonClicked',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: 'POST',
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

export const loadNotifications = createAsyncThunk(
  'authenticate/loadNotifications',
  async () => {
    const {
      data: { response },
    } = await axios({
      method: 'GET',
      url: `${Backend_URL}/social-profiles/notifications`,
    });
    return response;
  }
);

export const logoutUser = createAction('authentication/logoutUser');

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    authentication: getLocalStorage(),
    signUp: {
      signUpStatus: 'idle',
      signUpError: '',
    },
    notifications: [],
  },
  reducers: {},
  extraReducers: {
    [logoutUser]: (state) => {
      Object.assign(state.authentication, {
        token: '',
        name: '',
        userName: '',
        avatar: '',
        userId: '',
      });
      state.notifications = [];
      localStorage?.removeItem('session');
    },

    [signupButtonClicked.pending]: (state, action) => {
      state.signUp.signUpStatus = 'loading';
    },

    [signupButtonClicked.fulfilled]: (state, action) => {
      state.signUp.signUpStatus = 'success';
    },

    [signupButtonClicked.rejected]: (state, action) => {
      state.signUp.signUpStatus = 'error';
      state.signUp.signUpError = action.payload;
    },

    [loginButtonClicked.fulfilled]: (state, action) => {
      Object.assign(state.authentication, { ...action.payload.userDetails });
      setLocalStorage(action.payload.userDetails);
      setupAuthHeaderForServiceCalls(action.payload.userDetails.token);
    },

    [loginButtonClicked.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [loadNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload;
    },
    [loadNotifications.rejected]: (state, action) => {
      console.log(action.error.message);
    },
  },
});

export default authenticationSlice.reducer;
export const useAuthentication = () => {
  useSelector((state) => state.authentication);
};
