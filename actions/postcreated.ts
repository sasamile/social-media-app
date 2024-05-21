"use server";

import db from "@/lib/db";
import { PostCreatedProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const PostCreated = async ({ url, text }: PostCreatedProps) => {
  const { userId } = auth();

  await db.tweet.create({
    data: {
      userId,
      text,
      imageUrl: url,
    },
  });

  revalidatePath("/");
};
