import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
// import { fetchPosts } from "../../services/fetchPosts";
import axios from "axios";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
  // const response = await fetchPosts();
  const response = await axios.get(
    "https://social-media-server.tanaypratap.repl.co/posts"
  );
  console.log("here", response.data);
  return response.data;
});

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    error: null,
    posts: [],
  },
  reducers: {
    likeButtonPressed: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post.postID === action.payload
      );
      state.posts[postIndex].likes += 1;
    },

    sendPost: ({ posts }, action) => {
      posts.push(action.payload.post);
    },
  },

  extraReducers: {
    [loadPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.status = "fulfilled";
    },
    [loadPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { likeButtonPressed } = postSlice.actions;

export default postSlice.reducer;
