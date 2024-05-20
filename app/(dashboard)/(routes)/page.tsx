"use client";

import { useEffect, useState } from "react";
import MainSeccion from "./_components/MainSeccion";
import FormTweet from "./_components/FormTweet";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <MainSeccion title="Home" loading={loading}>
        <FormTweet setloading={setLoading} />
          
      </MainSeccion>
    </>
  );
}
