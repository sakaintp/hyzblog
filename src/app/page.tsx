'use client'

import { Button } from '@nextui-org/button'
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { useRouter } from 'next/navigation'
import StarSky from '@/components/StarSky'
import { NoiseFilter } from '@/components/NoiseFilter'
import { useThemeStore } from '@/store/useThemeStore'
import './page.css'

export default function Home() {
  const router = useRouter()
  const { isDarkMode } = useThemeStore()

  return (
    <div className="main-box grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pt-20 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {isDarkMode && (
        <>
          <StarSky />
          <NoiseFilter />
        </>
      )}
      
      <div className="logo-container">
        <h1 className="glitch" data-text="HYZ&apos;s BLOG">
          HYZ&apos;s BLOG
        </h1>
        <div className="decor-line"></div>
      </div>

      

      <div className="dark:text-fuchsia-900 text-red-900"></div>

      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          hello! welcome to hyzblog
        </li>
        <li>this is my practice project.</li>
      </ol>

      <Button onPress={() => router.push('/home/chat')}>Click me</Button>
    </div>
  )
}