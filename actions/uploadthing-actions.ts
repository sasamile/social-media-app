"use server";

import { UploadFileResponse } from "@/types";
import { utapi } from "./uploadthing";
import { formatImageUrl } from "@/lib/format-url";



export async function uploadFiles(formData: FormData) {
    try {
      const file = formData.get("file");
  
      if (file instanceof File) {
        const response: UploadFileResponse = await utapi.uploadFiles(file);
  
        if (response.data) {
          return { success: true, data: response.data };
        }
  
        return { success: false };
      } else {
        throw new Error("Invalid file");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

export async function deleteImageFile(imageUrl: string) {
  try {
    const newImageUrl = formatImageUrl(imageUrl);
    const response = await utapi.deleteFiles(newImageUrl);

    return { success: response.success };
  } catch (error) {
    console.log(error);
  }
}