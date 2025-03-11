import figlet from "figlet";
import fs from "fs";
import path from "path";
import { cwd } from "process";

const fonts = {
  ogre: {
    name: "Ogre",
    path: "/public/Ogre.flf",
  },
  doom: {
    name: "Doom",
    path: "/public/Doom.flf",
  },
} as const;

export default async function Home() {
  const fontFileName = fonts.ogre.path;
  const fontPath = path.join(cwd(), fontFileName);
  const fontData = fs.readFileSync(fontPath, "ascii");

  figlet.parseFont(fonts.ogre.name, fontData);
  const figletText = figlet.textSync("rosani", {
    font: fonts.ogre.name,
    whitespaceBreak: true,
  });
  return (
    <div className="font-mono flex flex-col items-center justify-center">
      <pre>{figletText}</pre>
      Hello, je m&apos;appelle simone Je suis un musicist
    </div>
  );
}
