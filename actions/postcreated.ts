"use server";

import db from "@/lib/db";
import { PostSchema } from "@/schemas";
import { PostCreatedProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { deleteImageFile } from "./uploadthing-actions";

export const PostCreated = async (values: z.infer<typeof PostSchema>) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not authenticated.");
  }
  try {
    const validatedFields = PostSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { caption, imageUrl } = validatedFields.data;

    if (!caption && !imageUrl) {
      return { error: "It must have at least the caption or image" };
    }

    await db.tweet.create({
      data: {
        userId,
        text: caption,
        imageUrl,
      },
    });

    revalidatePath("/");

    return { success: "Posted" };
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const DeletePost = async (id: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  try {
    const data = await db.tweet.delete({
      where: {
        id,
        userId,
      },
    });

    if (!data) {
      throw new Error("Tweet not found");
    }
    if (data.imageUrl !== null) {
      await deleteImageFile(data.imageUrl);
    }

    revalidatePath("/");
  } catch (error) {
    throw new Error("Error al borrar el tweet");
  }
};
