"use server";

import db from "@/lib/db";



export const PostAll = async () => {
  try {
    const Post = await db.tweet.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return Post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
