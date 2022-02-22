import { useState } from "react";
import { useDispatch } from "react-redux";
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from "../utils";
import { updateProfileButtonClicked, useProfile } from "./profileSlice";
import { MdCameraAlt, MdClose } from "react-icons/md";
import { UploadImage } from "../posts/uploadImage";
import { Modal } from "../posts/Modal";

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
        setIsOpen(false);
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
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="border-2 border-gray-300 rounded-md px-2 text-sm"
      >
        Edit Profile
      </button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onClick={clearUpdates}
      >
        <div>
          <div className="w-96 flex flex-col gap-2">
            {/* <button onClick={clearUpdates}>
              <MdClose />
            </button> */}

            <div className="flex items-center gap-2">
              <label className="font-semibold mr-2 basis-1/3"> Avatar</label>

              <div className="w-full flex items-center">
                <UploadImage setToken={setToken} setMedia={setMedia} />

                <img
                  src={media?.url}
                  alt={userName}
                  className="w-32 h-32 rounded-full"
                />
              </div>
            </div>

            <div className="flex">
              <label className="font-semibold mr-2 basis-1/3"> Name</label>
              <input
                type="text"
                value={name}
                className=" outline-none w-full "
                readonly
              />
            </div>

            <div className="flex">
              <label className="font-semibold mr-2 basis-1/3"> Username</label>
              <input
                type="text"
                value={userName}
                className=" outline-none w-full"
                readonly
              />
            </div>

            <div className="flex">
              <label className="font-semibold mr-2 basis-1/3 "> Website</label>
              <input
                type="text"
                value={inputLink}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Website"
                className="p-2 border-2 border-gray-200 w-full rounded-md caret-primaryCoral focus:outline-none focus:border-rose-300"
              />
            </div>

            <div className="flex">
              <label className="font-semibold mr-2 basis-1/3 ">Bio</label>
              <input
                type="text"
                value={inputBio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write something about you.."
                className="p-2 border-2 border-gray-200 w-full rounded-md caret-primaryCoral focus:outline-none focus:border-rose-300"
              />
            </div>

            <div className="flex justify-center">
              <button onClick={updateProfile} className="text-lg border-2 border-primaryCoral text-primaryCoral rounded-md py-1 px-3 hover:text-white hover:bg-primaryCoral">Update</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
