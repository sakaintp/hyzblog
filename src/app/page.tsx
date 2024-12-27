"use client"
import {Button} from '@nextui-org/button';
// import type { Metadata } from "next";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import './page.css'
import gsap from 'gsap'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import StarSky from '@/components/StarSky'
import { useThemeStore } from '@/store/useThemeStore'
// export const metadata: Metadata = {
//   title: "HYZ Blog",
//   description: "Welcome to my personal blog where I share my thoughts and experiences",
// };

export default function Home() {
  const router = useRouter(); 
  const { isDarkMode } = useThemeStore()

  useEffect(() => {
    // 如果不是深色模式，直接返回
    if (!isDarkMode) return;

    const tur = document.querySelector('feTurbulence')
    const tl = gsap.timeline({
      onUpdate:()=>{
        tur?.setAttribute('baseFrequency',`0 ${val.freg}`)
        console.log(val.freg)
      }
    });
    const val = {
      freg:0.00001
    }
    tl.to(val, {
      freg:0.2,
      duration:0.2,
      ease:"linear.inOut"
    });
    tl.to(val, {
      freg:0.00001,
      duration:0.2,
      ease:"linear.inOut"
    });
    const timer = setInterval(() => {
      tl.restart()
    }, 3000);

    // 清理函数
    return () => {
      clearInterval(timer)
      // 可选：在切换回亮色模式时重置滤镜
      tur?.setAttribute('baseFrequency', '0 0.00001')
    }
  }, [isDarkMode]); // 添加 isDarkMode 作为依赖
  return (
    <div className="main-box grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pt-20 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       {isDarkMode && <StarSky />}
      {/* 滤镜不展示 */}
      <svg style={{display: "none"}}>
        <filter id="noise" colorInterpolationFilters="linearRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
          <feTurbulence type="turbulence" baseFrequency="0 0.00001" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0.15%" width="100%" height="100%" result="turbulence1"/>
          <feDisplacementMap in="SourceGraphic" in2="turbulence1" scale="10" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" result="displacementMap1"/>
        </filter>
      </svg>
      <div className="logo-container">
        <h1 className="glitch" data-text="HYZ's BLOG">
          HYZ's BLOG
        </h1>
        <div className="decor-line"></div>
      </div>
      <div className="fixed top-4 right-4">
        <ThemeSwitch />
      </div>
      <div className="dark:text-fuchsia-900 text-red-900">test</div>
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          hello!welcome to hyzblog
        </li>
        <li>this is my practice project.</li>
      </ol>
      <Button onPress={() => router.push('/main')}>Click me</Button>
    </div>
  );
}
