"use client"
// import type { Metadata } from 'next'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { Inter } from 'next/font/google'
// import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Home Layout',
//   description: 'Home page layout',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
      <div className="parent-container w-full h-full">
      <div className="navigation-bar fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50 p-4 flex gap-4">
        <Link 
          href="/home/chat" 
          className={`px-4 py-2 rounded transition-colors duration-200
            ${pathname.startsWith('/home/chat') 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          聊天页面
        </Link>
        <Link 
          href="/home/page1" 
          className={`px-4 py-2 rounded transition-colors duration-200
            ${pathname.startsWith('/home/page1') 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          页面1
        </Link>
        <Link 
          href="/home/page2" 
          className={`px-4 py-2 rounded transition-colors duration-200
            ${pathname.startsWith('/home/page2') 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          页面2
        </Link>
      </div>
      <div style={{marginTop:'72px'}} className="box-border h-[calc(100vh-72px)] page-content p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </div>
    </div>
  )
}