"use client";

import TextFiglet from "./components/text-figlet";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Homepage");

  return (
    <div className="font-mono flex flex-col items-center justify-center p-4">
      <TextFiglet
        text={"rosani"}
        animate={true}
        animationSpeed={0.4}
        minHeight="180px"
        className="text-center"
      />
      <p>{t("about.hello")}</p>
      <p>
        {t.rich("about.love", {
          link: (chunks) => (
            <Link
              href="https://sabrinas.space"
              className="hover:underline underline sm:no-underline underline-offset-4"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
