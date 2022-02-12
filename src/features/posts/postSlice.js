import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
// import { fetchPosts } from "../../services/fetchPosts";
import axios from "axios";
import { Backend_URL } from "../utils";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
  // const response = await fetchPosts();
  const {
    data: { response },
  } = await axios.get(`${Backend_URL}/posts`);
  console.log("here", response);
  return response;
});

export const createPostButtonClicked = createAsyncThunk(
  "posts/createPostButtonClicked",
  async ({ post }) => {
    const {
      data: { response },
    } = await axios.post(`${Backend_URL}/posts`, { ...post });
    return response;
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    sharedPost: null,
    posts: [],
    usersWhoLikedPost: [],
    showLikesContainer: false,
  },
  reducers: {
    // likeButtonPressed: (state, action) => {
    //   const postIndex = state.posts.findIndex(
    //     (post) => post.postID === action.payload
    //   );
    //   state.posts[postIndex].likes += 1;
    // },
    // sendPost: ({ posts }, action) => {
    //   posts.push(action.payload.post);
    // },
  },

  extraReducers: {
    // [loadPosts.pending]: (state, action) => {
    //   state.status = "loading";
    // },

    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "fulfilled";
    },

    [loadPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      console.log(action.error.message);
    },

    [createPostButtonClicked.fulfilled]: (state, action) => {
      state.posts.unshift(action.payload);
    },

    [createPostButtonClicked.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    []
  },
});

export const { likeButtonPressed } = postSlice.actions;

export default postSlice.reducer;
