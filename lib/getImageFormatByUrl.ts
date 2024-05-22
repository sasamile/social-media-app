import { ImageFormat } from "@/types";

export const getImageFormatByFile = (archivo: File): Promise<ImageFormat> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      if (width > height) {
        resolve("horizontal");
      } else if (width < height) {
        resolve("vertical");
      } else {
        resolve("square");
      }
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = URL.createObjectURL(archivo);
  });
};

export const getImageFormatByUrl = (imageUrl: string): Promise<ImageFormat> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      if (width > height) {
        resolve("horizontal");
      } else if (width < height) {
        resolve("vertical");
      } else {
        resolve("square");
      }
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = imageUrl;
  });
};