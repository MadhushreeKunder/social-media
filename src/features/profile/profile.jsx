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
import { MdLogout } from "react-icons/md";

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
        <button onClick={() => dispatch(logoutUser())}>
          {" "}
          <MdLogout />{" "}
        </button>
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
    <div className="mt-28">
      {profileDetails && (
        <div>
          <div className="flex px-12 py-2 pb-4 mb-4 border-b-2 border-gray-200 gap-10  ">
            <img
              src={profileDetails?.avatar}
              alt={profileDetails.userName}
              className="border-2 border-gray-200 rounded-full w-40 h-40"
            />

            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <h1 className=" text-2xl">{profileDetails.userName}</h1>
                {getButton()}
              </div>
              <div className="flex gap-4">
                <p>
                  <strong>{postsDetails.length}</strong> posts
                </p>
                <p className="flex gap-1">
                  <strong>{profileDetails.count.followers}</strong>
                  <FollowersContainer userName={userName} />
                </p>

                <p className="flex gap-1">
                  <strong>{profileDetails.count.following}</strong>
                  <FollowingContainer userName={userName} />
                </p>
              </div>
              <div className="flex flex-col">
                <p className=" font-medium text-lg"> {profileDetails.name}</p>
                <p> {profileDetails.bio}</p>{" "}
              </div>
              <a
                href={profileDetails.link}
                target="_blank"
                rel="noreferrer"
                className=" text-blue-800 font-medium"
              >
                {profileDetails.link}
              </a>
            </div>
          </div>
          <div>
            {postsDetails.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
