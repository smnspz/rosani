"use client";

import { useState } from "react";
import TextFiglet from "./components/text-figlet";
import Link from "next/link";

export default function Home() {
  const [text] = useState("rosani");

  return (
    <div className="font-mono flex flex-col items-center justify-center p-4">
      <TextFiglet
        text={text}
        animate={true}
        animationSpeed={0.4}
        minHeight="180px"
        className="text-center"
      />
      <p>Hello visitor, i&apos;m Simone (Rosani), a web and mobile developer</p>
      <p>
        I love clean and simple UIs, but i&apos;m also intrigued by{" "}
        <Link
          href="https://sabrinas.space/"
          className="hover:underline underline sm:no-underline underline-offset-5"
        >
          the way japanese people prefere their websites
        </Link>
      </p>
    </div>
  );
}
