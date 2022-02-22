import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthentication } from "../auth/authenticationSlice";
import {
  loadFollowing,
  resetFollowing,
  useFollowing,
  followButtonClickedInFollowingList,
} from "./followingUsersSlice";
import { Link } from "react-router-dom";
import { Modal } from "../posts/Modal";

export const FollowingContainer = ({ userName }) => {
  const {
    authentication: { userName: viewerName, token },
  } = useAuthentication();

  const { followingDetails } = useFollowing();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(loadFollowing(userName));
    }
    return () => {
      dispatch(resetFollowing());
    };
  }, [dispatch, userName, token]);

  const getFollowButton = (followedByViewer, userFromList, viewerName) => {
    if (userFromList === viewerName) {
      return "";
    }

    return (
      <button
        onClick={() =>
          dispatch(
            followButtonClickedInFollowingList({
              userName: userFromList,
              viewerName,
              profileUserName: userName,
            })
          )
        }
      >
        {followedByViewer ? "Following" : "Follow"}
      </button>
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        following
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          {followingDetails.length === 0 ? (
            <p>No one following yet</p>
          ) : (
            followingDetails.map(({ userName, followedByViewer, avatar }) => {
              return (
                <div key={userName} className="flex gap-2 my-2 justify-between">
                  <Link to={`/profile/${userName}`}>
                    <div className="flex items-center">
                      <img
                        src={avatar}
                        alt={userName}
                        className="border-2 border-gray-200 w-10 h-10 rounded-full mr-2"
                      />
                      <p>{userName}</p>
                    </div>
                  </Link>
                  <button className="border-2 border-gray-300 px-2 py-1 rounded-md ">
                    {getFollowButton(followedByViewer, userName, viewerName)}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </Modal>
    </>
  );
};
