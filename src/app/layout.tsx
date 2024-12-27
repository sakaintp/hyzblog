import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import "./styles/globals.scss";
import {Providers} from "./providers";
import React from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "HYZ Blog",
  description: "Welcome to my personal blog where I share my thoughts and experiences",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  openGraph: {
    title: 'HYZ Blog',
    description: 'Welcome to my personal blog where I share my thoughts and experiences',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'HYZ Blog',
  }
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{overflow:'hidden'}}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
