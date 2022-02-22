import { useDispatch } from "react-redux";
import { useAuthentication } from "../auth/authenticationSlice";
import { deletePostButtonClicked, likeButtonClicked } from "./profileSlice";
import { userLikesClicked } from "../posts/postSlice";
import { Link } from "react-router-dom";
import { MdClose, MdDelete, MdFavorite } from "react-icons/md";
import Linkify from "react-linkify";

export const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const {
    authentication: { userName },
  } = useAuthentication();

  const getColorForIconButton = (criteria) => (criteria ? "pink" : "gray");

  const getLikesText = (totalLikes) => {
    return totalLikes === 0 ? (
      <div
        onClick={() =>
          dispatch(likeButtonClicked({ postId: post._id, updateProfile: true }))
        }
      >
        Be the first to like this
      </div>
    ) : (
      <div onClick={() => dispatch(userLikesClicked({ postId: post._id }))}>
        Liked by {post?.totalLikes} people
      </div>
    );
  };

  const showDeleteButton = post?.userId?.userName === userName;

  return (
    <>
      <article className="border-2 shadow-lg rounded-2xl border-gray-100 my-6">
        <div className="flex flex-col">
          <div className="flex flex-row p-4 items-center justify-between">
            <div className="flex gap-3 mt-2">
              <img
                src={post?.userId?.avatar}
                alt={post?.userId?.userName}
                className="border-2 border-gray-200 w-10 h-10 rounded-full"
              ></img>
              <Link to={`/profile/${post?.userId?.userName}`}>
                <h1 className="font-medium text-lg">
                  {post?.userId?.userName}
                </h1>
              </Link>
            </div>

            {showDeleteButton && (
              <button
                onClick={() =>
                  dispatch(deletePostButtonClicked({ postId: post._id }))
                }
              >
                <MdDelete className="text-2xl text-mediumGray focus:border-rose-300 focus:ring-1 mr-4 cursor-pointer" />
              </button>
            )}
          </div>
          <div className="border-y-2">
            <p className="m-4 text-2xl">
              <Linkify>{post?.content}</Linkify>
            </p>
            {post?.media && <img src={post?.media} alt={post?.content} />}
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1 font-medium">
              <button
                onClick={() =>
                  dispatch(likeButtonClicked({ postId: post._id }))
                }
                color={getColorForIconButton(post?.likedByViewer)}
              >
                <MdFavorite className="text-xl text-darkGray" />
              </button>
              {getLikesText(post?.totalLikes)}
            </div>
            <div className="flex gap-2 my-2 items-center">
              <Link to={`/profile/${post?.userId?.userName}`}>
                <h2 className="font-semibold text-lg">
                  {post?.userId?.userName}{" "}
                </h2>
              </Link>
              <p>{post?.caption}</p>
            </div>
            <p className="text-sm text-mediumGray">{post?.time}</p>
          </div>
        </div>
      </article>
    </>
  );
};
