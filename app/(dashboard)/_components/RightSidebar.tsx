import React from "react";
import Darknode from "./Darknode";
import { RigthPreviewsCard1 } from "./RigthPreviewsCard1";

import Image from "next/image";
import { Button } from "../../../components/ui/button";
import Items from "./Items";

const RightSidebar = () => {
  return (
    <div className="sticky top-0">
      <Darknode />
      <div className="flex flex-col">
        {/* Preview card */}
        <div >
          <RigthPreviewsCard1 title="Whats happening">
            {whatHasppening.map((item, index) => (
              <Items key={index}>
                <h2 className="font-bold text-gray-800 text-base dark:text-white">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-400">{item.count}</p>
              </Items>
            ))}
          </RigthPreviewsCard1>
        </div>
        {/* 2 items */}
        <div className="">
          <RigthPreviewsCard1 title="Who to follow">
            {whoFollow.map((item, index) => (
              <Items key={index}>
                <div className="flex flex-row max-lg:flex-col justify-between p-2">
                  <div className="flex flex-row">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-full"
                      width={10}
                      height={10}
                    />
                    <div className="flex flex-col  ml-2">
                      <h2 className="font-bold text-gray-900 text-sm dark:text-white">
                        {item.name}
                      </h2>
                      <p className="text-xs text-gray-400">{item.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-full">
                    <Button className="rounded-full text-xs">Follow</Button>
                  </div>
                </div>
              </Items>
            ))}
          </RigthPreviewsCard1>
        </div>
        {/* 3 items */}
      </div>
    </div>
  );
};

export default RightSidebar;

const whatHasppening = [
  {
    title: "#React Js",
    count: "24.4k Twets",
  },
  {
    title: "#Next Js",
    count: "18.4k Twets",
  },
];

const whoFollow = [
  {
    name: "James",
    handle: "@DiosPro",
    image: "/1.jpg",
  },
  {
    name: "Santiago",
    handle: "@Inje",
    image: "/2.jpg",
  },

];
