"use client";

import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { PostSchema } from "@/schemas";
import { deleteImageFile, uploadFiles } from "@/actions/uploadthing-actions";
import { PostCreated } from "@/actions/postcreated";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/userAvatar";
import { Input } from "@/components/ui/input";
import { PostImage } from "./PostImage";

interface PostFormProps {
  imageInputId?: string;
  imageStyles?: string;
  className?: string;
  onOpen?: (open: boolean) => void;
}

function FormTweet({
  imageInputId,
  className,
  imageStyles,
  onOpen,
}: PostFormProps) {
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      caption: "",
      imageUrl: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { setValue, getValues, reset, register, watch } = form;

  const watchedCaption = watch("caption");
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      // Verificar el tamaño del archivo (en bytes)
      const maxSizeInBytes = 16 * 1024 * 1024; // 16MB
      if (file.size > maxSizeInBytes) {
        // El archivo excede el tamaño permitido
        setImageSrc(null);
        toast({
          variant: "destructive",
          title: "Error",
        });
        return;
      }

      // Crear una URL para el archivo seleccionado
      const src = URL.createObjectURL(file);

      setImageSrc(src);
    }
  };

  const handleSubmite = (formData: FormData) => {
    if (imageSrc) {
      startTransition(async () => {
        try {
          const response = await uploadFiles(formData);

          if (response?.success && response.data) {
            setValue("imageUrl", response.data.url);
            const { error, success } = await PostCreated(getValues());

            if (error) {
              reset();
              setImageSrc(null);
              await deleteImageFile(response.data?.url);
              toast({
                variant: "destructive",
                title: "Error",
              });
            }

            if (success) {
              reset();
              setImageSrc(null);
              if (onOpen) onOpen(false);
              toast({
                variant: "success",
                title: "Tweet creado correctamente",
              });
            }

            if (!response?.success) {
              toast({
                variant: "destructive",
                title: "Error Image exceeds 4MB",
              });
            }
          }
        } catch (error) {
          console.error("Error al subir la imagen:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "No se pudo subir la imagen. Por favor, inténtalo de nuevo.",
          });
        }
      });
    }

    if (!imageSrc && watchedCaption) {
      startTransition(async () => {
        const { error, success } = await PostCreated(getValues());

        if (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error,
          });
        }

        if (success) {
          reset();
          if (onOpen) onOpen(false);
          toast({
            variant: "success",
            title: "Tweet creado correctamente",
          });
        }
      });
    }
  };

  return (
    <div
      className={cn(
        "flex items-start ms:px-5 px-4 ms:pt-5 pt-3 pb-3 ms:gap-3 gap-2 border-b border-white/10 ",
        className
      )}
    >
      <div className="pt-2">
        <UserAvatar src={user?.imageUrl} size="default" />
      </div>

      <form action={handleSubmite} className="flex flex-col gap-3 flex-1 ">
        <div className="flex flex-col gap-3 ">
          <Input
            placeholder="What's going on?!"
            className="text-xl border-none w-full h-10 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
            autoComplete="off"
            disabled={isPending || isSubmitting}
            {...register("caption")}
          />
          {imageSrc && (
            <div className={cn(imageStyles)}>
              <PostImage
                imageSrc={imageSrc}
                showClose
                onClose={() => {
                  setImageSrc(null);
                }}
              />
            </div>
          )}
        </div>

        <div className="flex w-full">
          <label
            htmlFor={imageInputId}
            className="relative flex items-center justify-center cursor-pointer"
          >
            <input
              id={imageInputId}
              disabled={isSubmitting || isPending}
              name="file"
              type="file"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
            <div className="flex justify-center items-center rounded-full p-2 hover:bg-accent transition">
              <ImagePlus
                className={cn(
                  "h-6 w-6 dark:text-neutral-300 text-neutral-600",
                  isSubmitting ||
                    (isPending &&
                      "dark:text-neutral-300/80 text-neutral-600/80")
                )}
              />
            </div>
          </label>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              isPending ||
              (watchedCaption?.trim().length === 0 && !imageSrc)
            }
            className="ml-auto rounded-full sm:px-7 px-5 text-base font-semibold"
          >
            {isPending && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormTweet;
