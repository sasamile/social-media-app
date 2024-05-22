"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageFormat } from "@/types";
import { getImageFormatByUrl } from "@/lib/getImageFormatByUrl";

interface PostImageProps {
  imageSrc: string;
  showClose?: boolean;
  onClose?: () => void;
}

export function PostImage({ imageSrc, showClose, onClose }: PostImageProps) {
  const [imageFormat, setImageFormat] = useState<ImageFormat | undefined>();

  useEffect(() => {
    (async () => {
      if (imageSrc) {
        const format = await getImageFormatByUrl(imageSrc);
        setImageFormat(format);
      }
    })();
  }, [imageSrc]);

  return (
    <div
      className={cn(
        "relative w-full h-full rounded-lg bg-muted aspect-square max-h-[480px] max-w-[480px]",
        imageFormat === "vertical" &&
          "aspect-[9/16] max-h-[510px] max-w-[384px]",
        imageFormat === "horizontal" &&
          "aspect-video max-h-[300px] max-w-[600px]",
        imageFormat === "square" && "aspect-square max-h-[480px] max-w-[480px]"
      )}
    >
      <Image
        src={imageSrc}
        alt="Post image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        quality={60}
        className="object-cover rounded-lg"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-3 right-3 rounded-full bg-neutral-500/50 hover:bg-neutral-400/80",
          !showClose && "hidden"
        )}
        onClick={onClose}
      >
        <X className="h-5 w-5 text-neutral-100" />
      </Button>
    </div>
  );
}