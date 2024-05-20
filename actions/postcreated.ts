"use server";

import db from "@/lib/db";
import { PostCreatedProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

export const PostCreated = async ({ url, text }: PostCreatedProps) => {
  const { userId } =  auth();

  await db.tweet.create({
    data: {
      userId,
      text,
      imageUrl: url,
    },
  });

  
};
