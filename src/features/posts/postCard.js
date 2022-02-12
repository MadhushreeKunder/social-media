import { useDispatch } from "react-redux";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { likeButtonClicked } from "../profile/profileSlice";

export const PostCard = ({ post }) => {
  const getLikesText = (totalLikes) => {
    return totalLikes === 0 ? (
      <div>Be the first one to like this</div>
    ) : (
      <div>Liked by {post?.totalLikes} people</div>
    );
  };

  const getColorForIconButton = (isLiked) => (isLiked ? "pink" : "gray");

  const dispatch = useDispatch();

  return (
    <article className="border-1 shadow-lg rounded-2xl">
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 p-4 items-center">
          <img src={post?.userId?.avatar} alt={post?.userId?.userName}></img>
          <Link to={`/profile/${post?.userId?.userName}`}>
            <h1 className="font-medium text-lg">{post?.userId?.userName}</h1>
          </Link>
        </div>
        <div className="border-y-2">
          <p className="m-4 text-2xl">{post?.content}</p>
          {post?.media && <img src={post?.media} alt={post?.content} />}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1 font-medium">
            <button
              onClick={() => dispatch(likeButtonClicked({ postId: post._id }))}
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
  );
};
