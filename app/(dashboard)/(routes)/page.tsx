import MainSeccion from "./_components/MainSeccion";
import FormTweet from "./_components/FormTweet";
import PostGetAll from "./_components/PostGetAll";
import { auth } from "@clerk/nextjs/server";

export default function Home() {
  return (
    <>
      <MainSeccion title="Home">
        <div className="max-md:hidden">
          <FormTweet />
        </div>
        <PostGetAll />
      </MainSeccion>
    </>
  );
}
