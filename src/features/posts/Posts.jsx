import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeButtonPressed, loadPosts } from "./postSlice";
import { MdFavorite, MdImage } from "react-icons/md";

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
    <div className="mt-20 mb-8 py-8 px-4">
      <div className="flex flex-row gap-4  relative">
        <div className="basis-2/3 ">
          {status === "loading" && <h2>loading...</h2>}
          {status === "error" && <h2>something went wrong... {error}</h2>}

          <section className="border shadow-lg rounded-2xl my-6">
            <div className="flex p-4 gap-3">
              <div>
                <img src="Images/logo2.png"></img>
              </div>
              <div className="flex flex-col grow ">
                <input
                  type="text"
                  placeholder="add caption"
                  className="border-2 mb-2 p-2 w-full rounded-md caret-primaryCoral focus:outline-none focus:border-rose-300 focus:ring-1"
                />
                <textarea
                  type="text"
                  placeholder="What's happening"
                  className="border-2 mb-2 p-2 w-full rounded-md caret-primaryCoral  focus:outline-none focus:border-rose-300 focus:ring-1 resize-y"
                />

                <div className="flex flex-row items-center">
                  <MdImage className="text-2xl text-mediumGray focus:border-rose-300 focus:ring-1 mr-4" />
                  <button className="text-lg border-2 border-primaryCoral text-primaryCoral rounded-md py-1 px-3 hover:text-white hover:bg-primaryCoral">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </section>

          {posts.map((post) => (
            <article
              key={post.postID}
              className="border-1 shadow-lg rounded-2xl my-6"
            >
              <div className="flex flex-col">
                <div className="caption"> {post.caption} </div>
                <div className="likes">
                  {post.likes}{" "}
                  <button
                    onClick={() => dispatch(likeButtonPressed(post.postID))}
                  >
                    <span role="img" aria-label="like">
                      ❤️
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}

          <article className="border-1 shadow-lg rounded-2xl">
            <div className="flex flex-col">
              <div className="flex flex-row gap-2 p-4 items-center">
                <img src="Images/logo2.png"></img>
                <h1 className="font-medium text-lg">Madhushree</h1>
              </div>
              <div className="border-y-2">
                <p className="m-4 text-2xl">Hey Coral Tube</p>
                <img src="Images/sample1.jpg" alt="" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 font-medium">
                  <MdFavorite className="text-xl text-darkGray" /> 5 likes
                </div>
                <div className="flex gap-2">
                  <h2 className="font-semibold">Madhushree</h2>
                  <p>Heyyoo</p>
                </div>
                <p className="text-sm text-mediumGray">Feb 2, 2022</p>
              </div>
            </div>
          </article>
        </div>

        <div className="basis-1/3 block overflow-y-auto">
          <div className="right-5">Suggestions tab</div>
        </div>
      </div>
    </div>
  );
}
