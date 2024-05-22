import { PostAll } from "@/actions/PostGetAll";
import Image from "next/image";
import { TweetExtended } from "@/types";
import Loading from "@/components/loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, ShieldX } from "lucide-react";
import ButtonDelete from "./ButtonDelete";
import { auth } from "@clerk/nextjs/server";
import { multiFormatDateString } from "@/lib/dataformat";

const PostGetAll = async () => {
  const posts: TweetExtended = await PostAll();
  if (!posts) return <Loading />;
  const { userId } = auth();

  return (
    <div className=" ">
      {posts.map((post, index) => {
        const date = multiFormatDateString(post.createdAt);
        return (
          <div key={index} className="border-b dark:border-gray-700">
            <div className=" p-5 flex  justify-between ">
              <div className="flex items-center gap-4">
                {post.user?.profileImage && (
                  <Image
                    src={post.user.profileImage}
                    alt="profile"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}
                <h2>{post.user?.name}</h2>
                <p>@{post.user?.username}</p>
                <p>{date}</p>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none ">
                    <EllipsisVertical className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="space-y-1 focus:outline-none">
                    {userId === post.user?.userId ? (
                      <>
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-500/50">
                          <Pencil className="w-3 h-3" />
                          <p className="text-xs">Edit</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="bg-red-500 hover:bg-red-600 text-white">
                          <ButtonDelete Id={post.id} />
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem className="flex text-sm items-center gap-4 cursor-pointer">
                        <ShieldX className="w-4 h-4" />
                        Denied
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex flex-col gap-4 py-2  ">
              <p className=" w-[90%] mx-auto ">{post.text}</p>

              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt="image"
                  width={500}
                  height={500}
                  className="mx-auto object-cover object-top aspect-video  rounded-lg mb-4 w-[80%] md:h-[360px]"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostGetAll;
