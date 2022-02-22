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
      <div onClick={() => setIsOpen(true)}>following</div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          {followingDetails.length === 0 ? (
            <p>No one following yet</p>
          ) : (
            followingDetails.map(({ userName, followedByViewer, avatar }) => {
              return (
                <div>
                  <Link to={`/profile/${userName}`}>
                    <div className="flex items-center">
                      <img src={avatar} alt="" />
                      <p>{userName}</p>
                    </div>
                  </Link>
                  {getFollowButton(followedByViewer, userName, viewerName)}
                </div>
              );
            })
          )}
        </div>
      </Modal>
    </>
  );
};
