import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { Backend_URL } from "../utils";

export const loadFollowing = createAsyncThunk(
  "profile/loadFollowing",
  async (userName) => {
    const {
      data: { response },
    } = await axios.get(`${Backend_URL}/social-profiles/${userName}/following`);
    return response;
  }
);

export const followButtonClickedInFollowingList = createAsyncThunk(
  "profile/followButtonClickedInFollowingList",
  async ({ userName, viewerName, profileUserName }) => {
    const {
      data: { isAdded },
    } = await axios.post(
      `${Backend_URL}/social-profiles/${userName}/followers`
    );
    return { isAdded, userName, viewerName, profileUserName };
  }
);

const followingUsersSlice = createSlice({
  name: "followingUsers",
  initialState: {
    followingDetails: [],
  },

  reducers: {
    resetFollowing: (state) => {
      state.followingDetails = [];
    },
  },

  extraReducers: {
    [loadFollowing.fulfilled]: (state, action) => {
      if (action.payload) {
        state.followingDetails = action.payload;
      }
    },

    [loadFollowing.rejected]: (state, action) => {
      console.log(action.error.message);
    },

    [followButtonClickedInFollowingList.fulfilled]: (state, action) => {
      const index = state.followingDetails.findIndex(
        (user) => user.userName === action.payload.userName
      );

      if (index !== -1) {
        state.followingDetails[index].followedByViewer = action.payload.isAdded;
      }
      if (
        !action.payload.isAdded &&
        action.payload.viewerName === action.payload.profileUserName
      ) {
        state.followingDetails = state.followingDetails.filter(
          (user) => user.userName !== action.payload.userName
        );
      }
    },
  },
});

export const { resetFollowing } = followingUsersSlice.actions;
export default followingUsersSlice.reducer;
export const useFollowing = () => useSelector((state) => state.following);
