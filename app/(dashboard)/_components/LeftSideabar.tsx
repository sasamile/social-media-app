"use client";

import Link from "next/link";
import { SibedarIcons } from "@/constants/SibedarIcons";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ArrowRight, Frame, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import CustomSVG from "@/components/customSVG";
import { usePathname } from "next/navigation";
import Loading from "@/components/loading";

const LeftSideabar = () => {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  return (
    <div className="h-screen flex flex-col justify-between py-2">
      <div className="flex flex-col">
        <div className="p-2 my-2 rounded-full dark:bg-sky-300 w-min">
          <Link href={"/"} className="w-8 h-8 block">
            <CustomSVG />
          </Link>
        </div>

        {SibedarIcons.map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={name}
              href={path}
              className={cn(
                "flex items-center p-2 rounded-xl w-min hover:bg-gray-200 dark:hover:bg-gray-600 transition ease-in-out duration-300 mb-2",
                isActive ? "bg-gray-200 dark:bg-gray-600 font-semibold" : ""
              )}
            >
              <div className="w-5 h-5">
                <Icon />
              </div>
              <div className="ml-4 text-sm max-xl:hidden">
                <h3>{name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
      {!isLoaded ? (
        <Loading />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 rounded-md flex items-center justify-between focus:outline-none max-xl:justify-center">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="User Avatar"
                width={40}
                height={30}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
            )}
            {user && (
              <div className="max-xl:hidden">
                <p className="text-sm">{user.firstName}</p>
                <p className="text-xs">@{user.username}</p>
              </div>
            )}
            <ArrowRight className="w-5 h-5 max-xl:hidden" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 dark:bg-gray-900 max-xl:w-auto space-y-2">
            <SignOutButton redirectUrl="/sign-in">
              <DropdownMenuItem className="flex gap-4">
                <LogOutIcon className="w-5 h-5" />
                <h1>Sign Out</h1>
              </DropdownMenuItem>
            </SignOutButton>
            <DropdownMenuItem className="flex gap-4">
              <Frame className="w-5 h-5" />
              Billing
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default LeftSideabar;
