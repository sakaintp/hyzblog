'use client'

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>('system')

  // 获取系统主题
  const getSystemTheme = useCallback(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])

  // 处理系统主题变化
  const handleSystemThemeChange = useCallback((e: MediaQueryListEvent | MediaQueryList) => {
    const currentTheme = localStorage.getItem('theme') as Theme
    if (currentTheme === 'system' || !currentTheme) {
      document.documentElement.className = e.matches ? 'dark' : 'light'
    }
  }, [])

  // 更新文档主题类名
  const updateDocumentTheme = useCallback((newTheme: Theme) => {
    const effectiveTheme = newTheme === 'system' ? getSystemTheme() : newTheme
    document.documentElement.className = effectiveTheme
  }, [getSystemTheme])

  // 处理主题变化
  const handleThemeChange = useCallback((newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    updateDocumentTheme(newTheme)
  }, [updateDocumentTheme])

  // 监听系统主题变化
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme || 'system'
    handleThemeChange(savedTheme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    // 只在 theme 为 system 时添加监听器
    if (savedTheme === 'system') {
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    }

    return () => {
      // 清理监听器
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [handleThemeChange, handleSystemThemeChange])

  // 监听 theme 变化来添加/移除系统主题监听器
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    if (theme === 'system') {
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    } else {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme, handleSystemThemeChange])

  if (!mounted) return null

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
          onPress={() => handleThemeChange('light')}
        >
          浅色
        </DropdownItem>
        <DropdownItem 
          key="dark" 
          startContent={<MoonIcon size={20} />} 
          onPress={() => handleThemeChange('dark')}
        >
          深色
        </DropdownItem>
        <DropdownItem 
          key="system" 
          startContent={<MonitorIcon size={20} />} 
          onPress={() => handleThemeChange('system')}
        >
          跟随系统
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}