import {Button} from '@nextui-org/button'; 
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import Image from "next/image";

export const metadata: Metadata = {
  title: "HYZ Blog",
  description: "Welcome to my personal blog where I share my thoughts and experiences",
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="fixed top-4 right-4">
          <ThemeSwitch />
        </div>
        <div className="dark:text-fuchsia-900 text-red-900">text-foreground</div>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            hello!welcome to hyzblog
          </li>
          <li>this is my practice project.</li>
        </ol>
        <Button>Click me</Button>
    </div>
  );
}
