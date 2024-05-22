import * as z from "zod";

export interface Preview {
  title: string;
  children?: React.ReactNode;
}

export interface MainProps {
  children: React.ReactNode;
  title: string;
  loading?: boolean;
}

export const PostSchema = z.object({
  caption: z.optional(z.string()),
  imageUrl: z.optional(z.string()),
});

export interface accessProps {
  setAccess:(access:boolean)=>void

}


export interface PostFormProps {
  imageInputId: string;
  imageStyles?: string;
  className?: string;
  onOpen?: (open: boolean) => void;
}