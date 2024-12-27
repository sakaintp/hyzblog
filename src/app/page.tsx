import {Button} from '@nextui-org/button'; 
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export const metadata: Metadata = {
  title: "HYZ Blog",
  description: "Welcome to my personal blog where I share my thoughts and experiences",
};

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="fixed top-4 right-4">
        <ThemeSwitch />
      </div>
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to HYZ Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Sharing thoughts on technology, programming, and life
        </p>
      </section>

      {/* Latest Posts Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* 这里可以后续替换为真实的博客文章数据 */}
          <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">
              <Link href="/blog/first-post" className="hover:text-blue-600">
                Getting Started with Next.js
              </Link>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Learn how to build modern web applications with Next.js...
            </p>
            <div className="text-sm text-gray-500">2024-03-21</div>
          </article>

          <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">
              <Link href="/blog/second-post" className="hover:text-blue-600">
                Web Development Best Practices
              </Link>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Essential tips and tricks for modern web development...
            </p>
            <div className="text-sm text-gray-500">2024-03-20</div>
          </article>
        </div>
      </section>

      {/* About Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-gray-600 dark:text-gray-400">
          I'm a passionate developer who loves to share knowledge and experiences through writing.
          Follow my journey as I explore new technologies and share insights.
        </p>
        <Button className="mt-6" color="primary">
          <Link href="/about">Learn More</Link>
        </Button>
      </section>
    </main>
  );
}
