import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Backend_URL } from "../utils";

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
