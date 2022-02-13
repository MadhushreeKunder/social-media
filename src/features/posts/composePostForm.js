import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useAuthentication } from "../auth/authenticationSlice";
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from "../utils";
import { MdImage } from "react-icons/md";

import {
  ACTIONS,
  initialStateOfPostForm,
  newPostFormReducer,
} from "./newPostForm.reducer";
import {
  createPostButtonClicked,
  storeSharedPost,
  usePostSelector,
} from "./postSlice";
import { UploadImage } from "./uploadImage";

export const ComposePostForm = () => {
  const [deleteToken, setToken] = useState("");
  const [media, setMedia] = useState(null);
  const initialRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, formDispatch] = useReducer(
    newPostFormReducer,
    initialStateOfPostForm
  );

  const {
    authentication: { userName, avatar, token },
  } = useAuthentication();

  const sharedQuery = new URLSearchParams(useLocation().search);
  const sharedPostTitle = sharedQuery.get("title");
  const { sharedPost } = usePostSelector();

  const {
    SET_CAPTION,
    SET_CONTENT,
    SET_CONTENT_ERROR,
    CLEAR_ERRORS,
    CLEAR_FORM,
  } = ACTIONS;

  const postButtonClicked = async () => {
    formDispatch({
      type: CLEAR_ERRORS,
    });

    if (/^\s*$/.test(formState.content)) {
      formDispatch({
        type: SET_CONTENT_ERROR,
        payload: { error: "Please fill post content!" },
      });
    } else {
      const newPostDetails = {
        caption: formState.caption,
        content: formState.content,
        media: media ? media.url : "",
      };

      const { meta } = await dispatch(
        createPostButtonClicked({ post: newPostDetails })
      );

      if (meta.requestStatus === "fulfilled") {
        formDispatch({
          type: CLEAR_FORM,
        });
        setMedia(null);
        setToken("");
        if (sharedPostTitle) {
          navigate("/");
        }
      }
    }
  };

  useEffect(() => {
    if (token && sharedPost) {
      (() => {
        formDispatch({ type: SET_CONTENT, payload: { content: sharedPost } });
        formDispatch({
          type: SET_CAPTION,
          payload: { caption: "Great Learning Experience!" },
        });
        dispatch(storeSharedPost(null));
      })();
    }
  }, [token, sharedPost, SET_CAPTION, SET_CONTENT, dispatch]);

  const deleteImage = async () => {
    try {
      const formData = new FormData();
      formData.append("upload_preset", CLOUDINARY_PRESET);
      formData.append("token", deleteToken);
      await fetch(`${CLOUDINARY_URL}/delete_by_token`, {
        method: "POST",
        body: formData,
      });
      setToken("");
      setMedia(null);
    } catch (error) {
      console.log(error);
      setToken("");
      setMedia(null);
    }
  };

  const clearPostForm = async () => {
    formDispatch({
      type: CLEAR_FORM,
    });
    if (deleteToken) {
      await deleteImage();
    }
    if (sharedPostTitle) {
      navigate("/");
    }
  };

  return (
    <section className="border shadow-lg rounded-2xl my-6">
      <div className="flex p-4 gap-3">
        <div>
          <img src="Images/logo2.png"></img>
        </div>
        <div className="flex flex-col grow ">
          <input
            type="text"
            placeholder="add caption"
            className="border-2 mb-2 p-2 w-full rounded-md caret-primaryCoral focus:outline-none focus:border-rose-300 focus:ring-1"
            value={formState.caption}
            onChange={(e) =>
              formDispatch({
                type: SET_CAPTION,
                payload: { caption: e.target.value },
              })
            }
          />
          <textarea
            type="text"
            placeholder="What's in your mind?"
            className="border-2 mb-2 p-2 w-full rounded-md caret-primaryCoral  focus:outline-none focus:border-rose-300 focus:ring-1 resize-y"
            value={formState.content}
            onChange={(e) =>
              formDispatch({
                type: SET_CONTENT,
                payload: { content: e.target.value },
              })
            }
            onFocus={() => {
              formDispatch({ type: SET_CONTENT_ERROR, payload: "" });
            }}
            // isInvalid={!!formState.contentError}
          />

          {media && (
            <div>
              <span>{media.fileName}</span>
              <button onClick={deleteImage}>x</button>
            </div>
          )}

          <div className="flex flex-row items-center">
            <UploadImage setToken={setToken} setMedia={setMedia} />

            <button
              className="text-lg border-2 border-primaryCoral text-primaryCoral rounded-md py-1 px-3 hover:text-white hover:bg-primaryCoral"
              onClick={postButtonClicked}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
