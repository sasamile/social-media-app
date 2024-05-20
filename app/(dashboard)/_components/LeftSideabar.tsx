"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { SibedarIcons } from "@/constants/SibedarIcons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ArrowRight, ArrowRightCircle, Frame, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LeftSideabar = () => {
  const [active, setActive] = useState("/");
  const { user } = useUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="h-screen flex  flex-col justify-between py-2">
      <div className=" flex flex-col  ">
        <div className="p-2 my-2 rounded-full dark:bg-sky-300 w-min">
          <Link href={"/"} className="w-8 h-8 block">
            {/* Logo Twiter */}
            <Image
              src={"/4.ico"}
              width={500}
              height={500}
              alt="logo"
              className="brightness-[0] d"
            />
            {/* <svg
              viewBox="0 0 24 24"
              className="text-blue-400 dark:text-white"
              fill="currentColor"
            >
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg> */}
          </Link>
        </div>
        {SibedarIcons.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            href={path}
            onClick={() => setActive(path)}
            className={cn(
              "flex items-center p-2 rounded-xl w-min hover:bg-gray-200 dark:hover:bg-gray-600 transition ease-in-out duration-300 mb-2",
              active === path
                ? "bg-gray-200 dark:bg-gray-600 font-semibold"
                : ""
            )}
          >
            <div className=" w-5 h-5 ">
              <Icon />
            </div>
            <div className="ml-4 text-sm max-xl:hidden ">
              <h3>{name} </h3>
            </div>
          </Link>
        ))}
      </div>
      {loading ? (
        <div className="flex items-center justify-center p-4 border-b border borderColor">
          <svg
            className="w-8 h-8 mr-3 -ml-1 text-blue-400 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-10"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2  rounded-md  flex items-center justify-between max-xl:justify-center ">
            <Image
              src={user?.imageUrl || "/4.ico"}
              alt="logo"
              width={40}
              height={30}
              className="rounded-full"
            />
            <div className="max-xl:hidden">
              <p className="text-sm">{user?.firstName}</p>
              <p className="text-xs">@{user?.username}</p>
            </div>

            <ArrowRight className="w-5 h-5 max-xl:hidden" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" w-48 dark:bg-gray-900 max-xl:w-auto space-y-2">
            <SignOutButton redirectUrl="/sign-in">
              <DropdownMenuItem className="flex gap-4 ">
                <LogOutIcon className="w-5 h-5 " />
                <h1>Sign Out</h1>
              </DropdownMenuItem>
            </SignOutButton>
            <DropdownMenuItem className="flex gap-4 ">
              <Frame className="w-5 h-5 " />
              Billing
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default LeftSideabar;
