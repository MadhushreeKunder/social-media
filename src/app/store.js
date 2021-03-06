

import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/auth/authenticationSlice";
import postReducer from '../features/posts/postSlice';
import usersReducer from '../features/users/usersSlice';
import profileReducer from '../features/profile/profileSlice';
import followersReducer from '../features/followersUsers/followersUsersSlice';
import followingReducer from '../features/followingUsers/followingUsersSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
		posts: postReducer,
		users: usersReducer,
		profile: profileReducer,
		followers: followersReducer,
		following: followingReducer,
    
  }
});
