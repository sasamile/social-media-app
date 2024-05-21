"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { ChangeEvent, useEffect, useState } from "react";
import { uploadFiles } from "@/actions/uploadthing-actions";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCreated } from "@/actions/postcreated";

function FormTweet({
  setloading,
}: {
  setloading?: (loading: boolean) => void;
}) {
  const { user } = useUser();
  const [text, setText] = useState("");
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

  const handleinputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleUpload = async () => {
    try {
      setImageUrl("");
      setText("");

      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }

      const result = await uploadFiles(formData);

      // setloading(false);
      // enviar la informacion a la api
      await PostCreated({ url: result?.data?.url || "", text: text });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("description");
    if (textarea) {
      textarea.style.height = "10px"; // Reiniciamos la altura para obtener la altura del contenido
      textarea.style.height = textarea.scrollHeight + "px"; // Establecemos la altura según el contenido
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  return (
    <div>
      <div className="flex items-center flex-shrink-0 p-4 pb-0 ">
        <div className="flex w-12 items-start">
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
          )}
        </div>
        <div className="w-full p-2 relative">
          <textarea
            id="description"
            onChange={handleinputChange}
            value={text}
            maxLength={500}
            placeholder="What's happening?"
            className=" w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent dark:text-white rounded-md border-none focus:ring-0 peer"
            style={{ scrollbarWidth: "none" }}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between  py-2 md:items-center border-b dark:border-gray-700">
        <div
          className={`flex px-10 w-full ${
            imageUrl && "max-md:px-5 max-md:w-[90%] max-md:mx-auto"
          }`}
        >
          {imageUrl && (
            <div className="space-y-4 w-full relative">
              <Image
                src={imageUrl}
                className="object-cover rounded-lg h-[350px] w-full"
                alt="my-image"
                width={500}
                height={500}
              />
              <button
                className="flex justify-center absolute top-0 right-8 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-400 dark:hover:bg-gray-600"
                onClick={() => setImageUrl("")}
              >
                <X />
              </button>

              <div className="flex justify-end pb-4">
                <Button variant={"tweet"}  onClick={handleUpload}>Tweet</Button>
              </div>
            </div>
          )}
          {!imageUrl && (
            <div className="p-2 text-blue-400 cursor-pointer rounded-full hover:bg-blue-50 dark:hover:bg-dim-800">
              <label
                htmlFor="file"
                className="relative flex items-center justify-center cursor-pointer"
              >
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
                <div className="flex justify-center items-center rounded-full p-2 hover:bg-accent transition">
                  <ImagePlus className="h-6 w-6 " />
                </div>
              </label>
            </div>
          )}
        </div>
        {!imageUrl && (
          <div className="mr-8   flex items-center justify-center  ">
            <Button variant={"tweet"} onClick={handleUpload}>
              Tweet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormTweet;
