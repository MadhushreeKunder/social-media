import { PostCard } from "./postCard";
import { SuggestionsSection } from "../users/suggestions";
import { ComposePostForm } from "./composePostForm";
import { usePostSelector } from "./postSlice";

export const Posts = () => {
  const { posts } = usePostSelector();
  return (
    <>
      <div className="mt-20 mb-8 py-8 px-4">
        <div className="flex flex-row gap-4  relative">
          <div className="basis-2/3 ">
            <ComposePostForm />
            {posts.length === 0 ? (
              <p>No posts yet</p>
            ) : (
              <section>
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </section>
            )}
          </div>
          <div className="basis-1/3 block overflow-y-auto">
            <SuggestionsSection />
          </div>
        </div>
      </div>
    </>
  );
};
