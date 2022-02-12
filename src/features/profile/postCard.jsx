import { useDispatch } from "react-redux";
import { useAuthentication } from "../auth/authenticationSlice";
import { deletePostButtonClicked, likeButtonClicked } from "./profileSlice";
import { userLikesClicked } from "../posts/postSlice";
import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import Linkify from "react-linkify/dist/components/Linkify";

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
      <article className="border-1 shadow-lg rounded-2xl">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 p-4 items-center">
            <img src={post?.userId?.avatar} alt={post?.userId?.userName}></img>
            <Link to={`/profile/${post?.userId?.userName}`}>
              <h1 className="font-medium text-lg">{post?.userId?.userName}</h1>
            </Link>
            {showDeleteButton && (
              <button
                onClick={() =>
                  dispatch(deletePostButtonClicked({ postId: post._id }))
                }
              >
                x
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
            <div className="flex gap-2">
              <Link to={`/profile/${post?.userId?.userName}`}>
                <h2 className="font-semibold">{post?.userId?.userName} </h2>
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
