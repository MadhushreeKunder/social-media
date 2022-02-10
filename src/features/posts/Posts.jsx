import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeButtonPressed, loadPosts } from "./postSlice";

export default function Posts() {
  const { posts, status, error } = useSelector((state) => {
    return state.posts;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts());
      console.log("useEffect");
    }
  }, [dispatch, status]);

  return (
    <div className="mt-48">
      <div>
        {status === "loading" && <h2>loading...</h2>}
        {status === "error" && <h2>something went wrong... {error}</h2>}

        {posts.map((post) => (
          <article key={post.postID} className="post">
            <div className="caption"> {post.caption} </div>
            <div className="likes">
              {post.likes}{" "}
              <button onClick={() => dispatch(likeButtonPressed(post.postID))}>
                <span role="img" aria-label="like">
                  ❤️
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
