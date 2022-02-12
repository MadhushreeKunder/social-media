import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Backend_URL } from "../utils";
import {
  followButtonClicked,
  followButtonClickedInFollowersList,
  followButtonClickedInFollowingList,
  removeFromFollowersButtonClicked,
} from "../followersUsers/followersUsersSlice";
import { useSelector } from "react-redux";

export const likeButtonClicked = createAsyncThunk(
  "posts/likeButtonClicked",
  async ({ postId, updateProfile = false }) => {
    const {
      data: { isLiked },
    } = await axios.post(`${Backend_URL}/posts/${postId}/likedby`);
    return { postId, isLiked, updateProfile };
  }
);

export const deletePostButtonClicked = createAsyncThunk(
  "posts/deletePostButtonClicked",
  async ({ postId }) => {
    const {
      data: { response },
    } = await axios.delete(`${Backend_URL}/posts/${postId}`);
    return response;
  }
);

export const loadUserProfile = createAsyncThunk(
  "profile/loadUserProfile",
  async (userName) => {
    const {
      data: { response },
    } = await axios.get(`${Backend_URL}/social-profiles/${userName}`);

    return response;
  }
);

export const loadUserPosts = createAsyncThunk(
  "profile/loadUserPosts",
  async (userName) => {
    const {
      data: { response },
    } = await axios.get(`${Backend_URL}/posts/user/${userName}`);

    return response;
  }
);

export const loadFollowing = createAsyncThunk(
  "profile/loadFollowing",
  async (userName) => {
    const {
      data: { response },
    } = await axios.get(`${Backend_URL}/social-profiles/${userName}/following`);
    return response;
  }
);

export const updateProfileButtonClicked = createAsyncThunk(
  "profile/updateProfileButtonClicked",
  async ({ userName, inputBio, inputLink, avatar }) => {
    const {
      data: { response },
    } = await axios.post(`${Backend_URL}/social-profiles/${userName}`, {
      bio: inputBio,
      link: inputLink,
      avatar,
    });
    return response;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileDetails: null,
    postsDetails: [],
  },

  reducers: {
    resetProfile: (state, action) => {
      state.profileDetails = null;
      state.postsDetails = [];
    },
  },

  extraReducers: {
    [loadUserProfile.fulfilled]: (state, action) => {
      state.profileDetails = action.payload;
    },

    [loadUserProfile.rejected]: (state, action) => {
      console.log(action.error.message);
    },

    [loadUserPosts.fulfilled]: (state, action) => {
      if (action.payload) {
        state.postsDetails = action.payload;
      }
    },

    [loadUserPosts.rejected]: (state, action) => {
      console.log(action.error.message);
    },

    [updateProfileButtonClicked.fulfilled]: (state, action) => {
      state.profileDetails.bio = action.payload.bio;
      state.profileDetails.link = action.payload.link;
      state.profileDetails.avatar = action.payload.avatar;
    },
    [updateProfileButtonClicked.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [followButtonClicked.fulfilled]: (state, action) => {
      action.payload.isAdded
        ? state.profileDetails.count.followers++
        : state.profileDetails.count.followers--;

      state.profileDetails.followedByViewer = action.payload.isAdded;
    },
    [followButtonClicked.rejected]: (state, action) => {
      console.log(action.error.message);
    },

    [likeButtonClicked.fulfilled]: (state, action) => {
      if (action.payload.updateProfile) {
        const index = state.postsDetails.findIndex(
          (post) => post._id === action.payload.postId
        );
        if (index !== -1) {
          state.postsDetails[index].likedByViewer = action.payload.isLiked;
          action.payload.isLiked
            ? state.postsDetails[index].totalLikes++
            : state.postsDetails[index].totalLikes--;
        }
      }
    },
    [likeButtonClicked.rejected]: (state, action) => {
      console.log(action.error.message);
    },

    [followButtonClickedInFollowersList.fulfilled]: (state, action) => {
      if (action.payload.viewerName === state.profileDetails.userName) {
        action.payload.isAdded
          ? state.profileDetails.count.following++
          : state.profileDetails.count.following--;
      }
    },
    [followButtonClickedInFollowingList.fulfilled]: (state, action) => {
      if (action.payload.viewerName === state.profileDetails.userName) {
        action.payload.isAdded
          ? state.profileDetails.count.following++
          : state.profileDetails.count.following--;
      }
    },
    [removeFromFollowersButtonClicked.fulfilled]: (state, action) => {
      state.profileDetails.count.followers--;
    },
    [removeFromFollowersButtonClicked.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [deletePostButtonClicked.fulfilled]: (state, action) => {
      const index = state.postsDetails.findIndex(
        (post) => post._id === action.payload
      );
      if (index !== -1) {
        state.postsDetails.splice(index, 1);
      }
    },
  },
});


export default profileSlice.reducer;

export const { resetProfile } = profileSlice.actions;

export const useProfile = () => useSelector((state) => state.profile);