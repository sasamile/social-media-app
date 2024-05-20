import { Preview } from "@/schemas";
import React from "react";

export const RigthPreviewsCard1 = ({ title, children }: Preview) => {
  return (
    <div className="m-2  overflow-hidden border rounded-2xl bg-gray-50 dark:bg-dim-700  border-gray-200 dark:border-gray-700 ">
      <h1 className="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white">
        {title}
      </h1>
      {children}
      <div className="p-3 text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 transition duration-300 ease-in-out">
        Show More
      </div>
    </div>
  );
};
