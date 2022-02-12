import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import {
  deletePostButtonClicked,
  likeButtonClicked,
} from "../profile/profileSlice";
import { Backend_URL } from "../utils";
import { logoutUser } from "../auth/authenticationSlice";
import { followButtonClicked } from "../followersUsers/followersUsersSlice";
import { useSelector } from "react-redux";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
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

export const userLikesClicked = createAsyncThunk(
  "posts/userLikesClicked",
  async ({ postId }) => {
    const {
      data: { response },
    } = await axios.get(`${Backend_URL}/posts/${postId}/likedby`);
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
    closeButtonInLikesContainerClicked: (state, action) => {
      state.showLikesContainer = false;
      state.usersWhoLikedPost = [];
    },
    storeSharedPost: (state, action) => {
      state.sharedPost = action.payload;
    },
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

    [likeButtonClicked.fulfilled]: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload.postId
      );

      if (index !== -1) {
        state.posts[index].likedByViewer = action.payload.isLiked;
        action.payload.isLiked
          ? state.posts[index].totalLikes++
          : state.posts[index].totalLikes--;
      }
    },

    [likeButtonClicked.rejected]: (state, action) => {
      console.log(action.error.message);
    },

    [deletePostButtonClicked.fulfilled]: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload.postId
      );
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },

    [deletePostButtonClicked.rejected]: (state, action) => {
      console.log(action.error.message);
    },

    [logoutUser]: (state, action) => {
      state.posts = [];
      state.status = "idle";
      state.usersWhoLikedPost = [];
      state.showLikesContainer = false;
    },

    [userLikesClicked.fulfilled]: (state, action) => {
      state.showLikesContainer = true;
      state.usersWhoLikedPost = action.payload;
    },

    [userLikesClicked.rejected]: (state, action) => {
      console.log(action.error.message);
    },

    [followButtonClicked.fulfilled]: (state, action) => {
      if (action.payload.isAdded) {
        state.posts.push(...action.payload.posts);
        state.posts.sort((post1, post2) => post2.createdAt - post1.createdAt);
      } else {
        state.posts = state.posts.filter(
          ({ _id }) => !action.payload.posts.find((post) => post._id === _id)
        );
      }
    },

    [deletePostButtonClicked.fulfilled]: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload
      );
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },
  },
});

export const { closeButtonInLikesContainerClicked, storeSharedPost } =
  postSlice.actions;

export default postSlice.reducer;

export const usePostSelector = () => useSelector((state) => state.posts);
