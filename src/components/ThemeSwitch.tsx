'use client'

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useThemeStore } from '@/store/useThemeStore'

export function ThemeSwitch() {
  const { theme, setTheme, getSystemTheme, updateDocumentTheme } = useThemeStore()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'system'
    setTheme(savedTheme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (theme === 'system') {
        document.documentElement.className = e.matches ? 'dark' : 'light'
      }
    }
    
    if (theme === 'system') {
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    }

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme, setTheme])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light" aria-label="切换主题">
          {theme === 'light' ? (
            <SunIcon size={20} />
          ) : theme === 'dark' ? (
            <MoonIcon size={20} />
          ) : (
            <MonitorIcon size={20} />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="主题选择">
        <DropdownItem 
          key="light" 
          startContent={<SunIcon size={20} />} 
          onPress={() => setTheme('light')}
        >
          浅色
        </DropdownItem>
        <DropdownItem 
          key="dark" 
          startContent={<MoonIcon size={20} />} 
          onPress={() => setTheme('dark')}
        >
          深色
        </DropdownItem>
        <DropdownItem 
          key="system" 
          startContent={<MonitorIcon size={20} />} 
          onPress={() => setTheme('system')}
        >
          跟随系统
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}