"use client";
import { uploadFiles } from "@/actions/uploadthing-actions";
import React, { ChangeEvent, useState } from "react";

export function Image() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0]);

    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImageUrl(event.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadFiles(formData);
      setImageUrl(result?.data?.url || "");
      console.log("Upload successful:", result);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  return (
    <div>
            <input type="file" onChange={handleFileChange} />     {" "}
      {imageUrl && <img src={imageUrl} alt="my-image" />}     {" "}
      <button onClick={handleUpload}>Upload</button>   {" "}
    </div>
  );
}
