"use server";

import db from "@/lib/db";
import { UserPostProp } from "@/types";

export const UserPost = async (UserPost: UserPostProp) => {
  try {
    const { name, profileImage, userId, username } = UserPost;

    const newUser = await db.user.create({
      data: {
        userId,
        name,
        profileImage,
        username,
      },
    });

    console.log("Datos enviados al backend correctamente: ", newUser);
  } catch (error) {
    console.error("Error al enviar los datos al backend", error);
  }
};

export const getUser = async (id: string) => {
  try {
    const result = await db.user.findUnique({
      where: {
        userId: id,
      },
    });

    if (!result) {
      console.log("Usuario no encontrado en la base de datos");
    } else {
      console.log("Usuario encontrado: ", result);
    }

    return result;
  } catch (error) {
    console.error("Error al buscar el usuario en la base de datos", error);
  }
};
