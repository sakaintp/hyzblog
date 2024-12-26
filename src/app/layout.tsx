'use client'

// import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import React, { useState, useEffect } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "hyzblog",
//   description: "hyzblog",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState('light'); // 初始设置为浅色模式

  //主题跟随系统
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      console.log('夜间模式为', e.matches ? '深色模式' : '浅色模式');
      if (e.matches) {
        setTheme('dark'); // 系统为深色模式
      } else {
        setTheme('light'); // 系统为浅色模式
      }
    };
    // 初始检查
    handleChange(mediaQuery); 
    // 监听系统颜色模式变化
    mediaQuery.addEventListener('change',handleChange);
    return () => {
      mediaQuery.removeEventListener('change',handleChange);
    };
  }, []);

  return (
    <html lang="en" className={theme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
