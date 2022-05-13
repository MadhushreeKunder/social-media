import { useDispatch } from "react-redux";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { likeButtonClicked } from "../profile/profileSlice";
import Linkify from "react-linkify";

export const PostCard = ({ post }) => {
  const getLikesText = (totalLikes) => {
    return totalLikes === 0 ? (
      <div>Be the first one to like this</div>
    ) : (
      <div>Liked by {post?.totalLikes} people</div>
    );
  };

  const getColorForIconButton = (isLiked) =>
    isLiked ? "text-xl text-primaryCoral" : "text-xl text-darkGray";

  const dispatch = useDispatch();

  return (
    <article className="border-2 shadow-lg rounded-2xl border-gray-100 my-6">
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 p-4 items-center">
          <img
            src={post?.userId?.avatar}
            alt={post?.userId?.userName}
            className="border-2 border-gray-200 w-10 h-10 rounded-full"
          />

          <Link to={`/profile/${post?.userId?.userName}`}>
            <h1 className="font-medium text-lg">{post?.userId?.userName}</h1>
          </Link>
        </div>
        <div className="border-y-2">
          <p className="m-4 text-2xl">
            {" "}
            <Linkify>{post?.content}</Linkify>
          </p>
          {post?.media && <img src={post?.media} alt={post?.content} />}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1 font-medium">
            <button
              onClick={() => dispatch(likeButtonClicked({ postId: post._id }))}
              // color={getColorForIconButton(post?.likedByViewer)}
            >
              <MdFavorite
                className={getColorForIconButton(post?.likedByViewer)}
              />
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
  );
};
