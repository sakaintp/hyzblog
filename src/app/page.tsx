import Image from "next/image";
import {Button} from '@nextui-org/button'; 
// import {Button} from '@nextui-org/react'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "hyzblog",
  description: "hyzblog",
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
