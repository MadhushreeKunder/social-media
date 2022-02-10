// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postSlice";

export default configureStore({
  reducer: {
    posts: postsReducer
  }
});
