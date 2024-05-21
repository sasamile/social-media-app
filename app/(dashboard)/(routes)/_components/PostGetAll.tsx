import { useEffect, useState } from "react";
import { PostAll } from "@/actions/PostGetAll";
import Image from "next/image";
import { Tweet, User } from "@prisma/client";
import { TweetExtended } from "@/types";
import Loading from "@/components/loading";

const PostGetAll = async () => {
  const posts: TweetExtended = await PostAll();
  if (!posts) return <Loading />;

  return (
    <div className=" ">
      {posts.map((post) => (
        <div className="border-b dark:border-gray-700">
          <div className=" p-5 flex items-center gap-4 ">
            {post.user?.profileImage && (
              <Image
                src={post.user.profileImage}
                alt="profile"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <h2>{post.user?.name}</h2>
            <p>@{post.user?.username}</p>
            <p>{post.createdAt.toLocaleTimeString()}</p>
          </div>
          <div className="flex flex-col gap-4 py-2  ">
            <p className=" w-[90%] mx-auto ">{post.text}</p>

            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                alt="image"
                width={500}
                height={500}
                className="mx-auto object-cover rounded-lg mb-4 w-[90%] h-[400px]"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGetAll;
