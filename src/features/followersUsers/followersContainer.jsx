import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAuthentication } from "../auth/authenticationSlice";
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

  return (
    <>
      <div>
        followers
        {followersDetails.length === 0 ? (
          <p>No followers yet</p>
        ) : (
          followersDetails.map(({ userName, followedByViewer, avatar }) => {
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
    </>
  );
};
