export type ImageFormat = "vertical" | "horizontal" | "square";

export type UploadFileResponse =
  | { data: UploadData; error: null }
  | { data: null; error: UploadError };

export type UploadData = {
  key: string;
  url: string;
  name: string;
  size: number;
};

export type UploadError = {
  code: string;
  message: string;
  data?: any;
};

export type UserPostProp = {
  userId:string;
  username:string ;
  profileImage: string;
  name: string;

}

export type PostCreatedProps = {
  url:string
  text:string
}