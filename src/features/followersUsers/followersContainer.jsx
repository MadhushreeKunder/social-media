import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAuthentication } from "../auth/authenticationSlice";
import { Modal } from "../posts/Modal";
import {
  loadFollowers,
  resetFollowers,
  useFollowers,
  removeFromFollowersButtonClicked,
  followButtonClickedInFollowersList,
} from "./followersUsersSlice";

export const FollowersContainer = ({ userName }) => {
  const { followersDetails } = useFollowers();
  const dispatch = useDispatch();

  const {
    authentication: { userName: viewerName, token },
  } = useAuthentication();

  useEffect(() => {
    if (token) {
      dispatch(loadFollowers(userName));
    }
    return () => {
      dispatch(resetFollowers());
    };
  }, [token, userName, dispatch]);

  const getFollowButton = (
    followedByViewer,
    userNameFromFollowList,
    viewerName
  ) => {
    if (viewerName === userName) {
      return (
        <button
          onClick={() =>
            dispatch(
              removeFromFollowersButtonClicked({
                userName: userNameFromFollowList,
              })
            )
          }
        >
          Remove
        </button>
      );
    }
    if (userNameFromFollowList === viewerName) {
      return "";
    }
    return (
      <button onClick={() => dispatch(followButtonClickedInFollowersList)}>
        {followedByViewer ? "Following" : "Follow"}
      </button>
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        followers
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          {followersDetails.length === 0 ? (
            <p>No followers yet</p>
          ) : (
            followersDetails.map(({ userName, followedByViewer, avatar }) => {
              return (
                <div key={userName} className="flex gap-2 my-2 justify-between">
                  <Link to={`/profile/${userName}`}>
                    <div className="flex items-center">
                      <img
                        src={avatar}
                        alt=""
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
