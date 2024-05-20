"use client";

import React, { useEffect } from "react";
import RightSidebar from "./_components/RightSidebar";
import LeftSideabar from "./_components/LeftSideabar";
import { UserButton, useUser } from "@clerk/nextjs";
import { getUser, UserPost } from "@/actions/userPost";

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  // useEffect(() => {
  //   const FetchUseFromBackend = async () => {
  //     if (!user) {
  //       console.log("No user found");
  //       return; // Ensure user is available
  //     }

  //     try {
  //       const result = await getUser(user.id);
        
  //       if (!result) {
  //         const UserData = {
  //           userId: user.id,
  //           name: user.firstName || "",
  //           profileImage: user.imageUrl || "",
  //           username: user.username || "",
  //         };
  //         await UserPost(UserData);
          
  //       }
  //     } catch (error) {
  //       console.error("Error while fetching or posting data", error);
  //     }
  //   };

  //   FetchUseFromBackend();
  // }, [user]);

  return (
    <div>
      <div className="min-h-full">
        <div className="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          {/* Left sidebar */}
          <div className="hidden md:block md:col-span-1 xl:col-span-2">
            <div className="sticky top-0">
              <LeftSideabar />
            </div>
          </div>
          {/* Main Content */}
          <main className="col-span-12 md:col-span-8 xl:col-span-7">
      
            {children}
          </main>
          {/* Right sidebar */}
          <div className="hidden md:block md:col-span-3 xl:col-span-3">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
