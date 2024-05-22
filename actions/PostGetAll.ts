"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/");
    return Post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
