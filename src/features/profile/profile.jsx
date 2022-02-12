import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { logoutUser, useAuthentication } from "../auth/authenticationSlice";
import { followButtonClicked } from "../followersUsers/followersUsersSlice";
import {
  loadUserPosts,
  loadUserProfile,
  resetProfile,
  useProfile,
} from "./profileSlice";
import { FollowersContainer } from "../followersUsers/followersContainer";
import { FollowingContainer } from "../followingUsers/followingContainer";
import { PostCard } from "./postCard";
import { UpdateProfileForm } from "./updateProfileForm";

export const Profile = () => {
  const { userName } = useParams();
  const { profileDetails, postsDetails } = useProfile();

  const {
    authentication: {
      userName: viewerUserName,
      avatar: viewerAvatar,
      name: viewerName,
    },
  } = useAuthentication();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserProfile(userName));
    dispatch(loadUserPosts(userName));
    return () => dispatch(resetProfile());
  }, [userName, dispatch]);

  const getButton = () => {
    return viewerUserName === userName ? (
      <>
        <UpdateProfileForm />
        <button onClick={() => dispatch(logoutUser())}>Log out</button>
      </>
    ) : (
      <button
        onClick={() =>
          dispatch(
            followButtonClicked({
              userName,
              posts: postsDetails,
              viewerDetails: { viewerUserName, viewerAvatar, viewerName },
            })
          )
        }
      >
        {profileDetails.followedByViewer ? "Following" : "Follow"}
      </button>
    );
  };

  return (
    <div>
      {profileDetails && (
        <div>
          <div className="flex">
            <img src={profileDetails?.avatar} alt={profileDetails.userName} />

            <div>
              <div>
                {profileDetails.userName}
                {getButton()}
              </div>
              <div>
                {postsDetails.length} posts
                <br />
                {profileDetails.count.followers}
                <FollowersContainer userName={userName} />
                <br />
                {profileDetails.count.following}
                <FollowingContainer userName={userName} />
              </div>
              <div>
                {profileDetails.name}
                <br />
                {profileDetails.bio}
              </div>
              {profileDetails.link}
            </div>
          </div>

          {postsDetails.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
