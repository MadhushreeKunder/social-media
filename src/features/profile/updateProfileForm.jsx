import { useState } from "react";
import { useDispatch } from "react-redux";
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from "../utils";
import { updateProfileButtonClicked, useProfile } from "./profileSlice";
import { MdCameraAlt } from "react-icons/md";

export const UpdateProfileForm = () => {
  const {
    profileDetails: { bio, link, name, userName, avatar: profileAvatar },
  } = useProfile();

  const [inputBio, setBio] = useState(bio);
  const [inputLink, setLink] = useState(link);
  const initialMedia = {
    fileName: "avatar",
    url: profileAvatar,
  };
  const [media, setMedia] = useState(initialMedia);
  const [deleteToken, setToken] = useState("");

  const dispatch = useDispatch();

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
      setMedia(initialMedia);
    } catch (error) {
      console.log(error);
      setToken("");
      setMedia(initialMedia);
    }
  };

  const updateProfile = async () => {
    try {
      const dispatchResponse = await dispatch(
        updateProfileButtonClicked({
          userName,
          inputBio,
          inputLink,
          avatar: media.url,
        })
      );
      if (dispatchResponse.meta.requestStatus === "fulfilled") {
        // close
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearUpdates = async () => {
    if (deleteToken) {
      await deleteImage();
    }
    setBio(bio);
    setLink(link);
  };

  return (
    <>
      <button>Edit Profile</button>

      <div>
        {/* overlay */}
        <div>
          <button top="0.25rem" left="1rem" size="lg" onClick={clearUpdates}>
            x
          </button>

          <div>
            <img src={media?.url} alt={userName} />
            <MdCameraAlt setMedia={setMedia} setToken={setToken} />
          </div>

          <div>
            <label> Name</label>
            <input type="text" value={name} isReadOnly />
          </div>

          <div>
            <label> Username</label>
            <input type="text" value={userName} isReadOnly />
          </div>

          <div>
            <label> Website</label>
            <input
              type="text"
              value={inputLink}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Website"
            />
          </div>

          <div></div>
          <label>Bio</label>
          <input
            type="text"
            value={inputBio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about you.."
          />

          <button onClick={updateProfile}>Update</button>
        </div>
      </div>
    </>
  );
};
