"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { ChangeEvent, useState } from "react";
import { uploadFiles } from "@/actions/uploadthing-actions";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCreated } from "@/actions/postcreated";

function FormTweet({ setloading }: { setloading: (loading: boolean) => void }) {
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
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setloading(true);
      setImageUrl("");
      setText("");

      const result = await uploadFiles(formData);
      setloading(false);
      // enviar la informacion a la api
      await PostCreated({ url: result?.data?.url || "", text: text });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center flex-shrink-0 p-4 pb-0 ">
        <div className="flex w-12 items-start">
          <Image
            src={user?.imageUrl ?? "/4.ico"}
            alt=""
            className="w-10 h-10 inline-block rounded-full"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full p-2 relative">
          <textarea
            onChange={handleinputChange}
            value={text}
            placeholder="What's happening?"
            className=" w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent  border-gray-100 focus:ring-0 dark:text-white rounded-md "
            style={{ scrollbarWidth: "none" }}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between  py-2 md:items-center border-b dark:border-gray-700">
        <div
          className={`flex p-2 pl-14 ${
            imageUrl && "max-md:pl-0 max-md:w-[90%] max-md:mx-auto"
          }`}
        >
          {imageUrl && (
            <div className="space-y-4">
              <Image
                src={imageUrl}
                className="object-cover rounded-lg h-[250px] w-[400px]"
                alt="my-image"
                width={500}
                height={400}
              />
              <div className="flex justify-between">
                <Button
                  variant={"outline"}
                  className="flex justify-center"
                  onClick={() => setImageUrl("")}
                >
                  <X /> Cancel
                </Button>

                <Button onClick={handleUpload}>Tweet</Button>
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
          <div className="mr-8 bg-blue-400 hover:bg-blue-600 rounded-full max-md:rounded-2xl p-2 max-md:py-1 w-min flex items-center justify-center text-white ">
            <button onClick={handleUpload}>Tweet</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormTweet;
