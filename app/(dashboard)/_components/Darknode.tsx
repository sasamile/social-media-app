"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";


function Darknode() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {theme === "dark" ? (
        <Button variant={"link"} onClick={() => setTheme("light")}>
          Light Mode
        </Button>
      ) : (
        <Button variant={"link"} onClick={() => setTheme("dark")}>
          Dark Mode
        </Button>
      )}
    </div>
  );
}

export default Darknode;
