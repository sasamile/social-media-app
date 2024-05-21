// "use client";

import { useEffect, useState } from "react";
import MainSeccion from "./_components/MainSeccion";
import FormTweet from "./_components/FormTweet";
import PostGetAll from "./_components/PostGetAll";

export default function Home() {
 
  return (
    <>
      <MainSeccion title="Home">
        <FormTweet />
        <PostGetAll />
      </MainSeccion>
    </>
  );
}
