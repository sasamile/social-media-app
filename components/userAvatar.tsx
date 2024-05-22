import { UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-10 w-10",
      md: "h-12 w-12",
      lg: "h-[68px] w-[68px]",
      xl: "md:h-[340px] md:w-[340px] h-72 w-72",
    },
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  src?: string | null;
  className?: string;
}

export function UserAvatar({ src, className, size }: UserAvatarProps) {
  return (
    <Avatar
      className={cn(
        "border-primary/15 object-cover",
        className,
        avatarSizes({ size })
      )}
    >
      <AvatarImage
        className="aspect-square h-full w-full object-cover"
        src={src || ""}
      />
      <AvatarFallback>
        <UserRound className={cn("h-2/5 w-2/5 text-neutral-500")} />
      </AvatarFallback>
    </Avatar>
  );
}