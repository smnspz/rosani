import figlet from "figlet";
import fs from "fs";
import path from "path";
import { cwd } from "process";

interface TextFigletProps {
  className?: string;
}

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

export default function TextFiglet({ className = "" }: TextFigletProps) {
  const fontFileName = fonts.ogre.path;
  const fontPath = path.join(cwd(), fontFileName);
  const fontData = fs.readFileSync(fontPath, "ascii");

  figlet.parseFont(fonts.ogre.name, fontData);
  const figletText = figlet.textSync("rosani", {
    font: fonts.ogre.name,
    whitespaceBreak: true,
  });

  return <pre className={className}>{figletText}</pre>;
}
