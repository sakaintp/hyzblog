
让我详细解释一下 `useCallback` 和 `useEffect` 这两个 React Hooks 的主要作用：

### useCallback

```typescript
const memoizedCallback = useCallback(
  (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  },
  [/* 依赖项数组 */]
)
```

**主要作用**：

   - 缓存函数的引用，避免每次渲染都创建新的函数
   
   - 只有当依赖项改变时，才会创建新的函数
   
2. **性能优化**
   ```typescript
   // ❌ 不好的做法：每次渲染都创建新函数
   const handleClick = () => {
     doSomething(prop)
   }

   // ✅ 好的做法：函数被缓存
   const handleClick = useCallback(() => {
     doSomething(prop)
   }, [prop])
   ```

3. **避免无限循环**

   - 特别是当函数作为其他 hooks 的依赖项时
   ```typescript
   // 可能导致无限循环
   useEffect(() => {
     handleTheme()  // 如果 handleTheme 每次渲染都新建，effect 会一直重新执行
   }, [handleTheme])
   ```
   

### useEffect

```typescript
useEffect(() => {
  // 执行副作用
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleChange)
  
  // 清理函数
  return () => {
    mediaQuery.removeEventListener('change', handleChange)
  }
}, [/* 依赖项数组 */])
```

**主要作用**：

1. **处理副作用**

   - 数据获取
   
   - 订阅事件
   
   - 手动修改 DOM
   
   - 与外部系统交互
   
2. **生命周期管理**
   ```typescript
   useEffect(() => {
     // 组件挂载时执行
     console.log('组件已挂载')
     
     return () => {
       // 组件卸载时执行
       console.log('组件将卸载')
     }
   }, [])
   ```

3. **依赖项更新时重新执行**
```typescript
   useEffect(() => {
     document.title = `当前主题: ${theme}`
   }, [theme]) // 当 theme 改变时更新标题
```

### 在主题切换组件中的具体应用

1. **useCallback 的应用**：
```typescript
// 缓存函数避免重复创建
const getSystemTheme = useCallback(() => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}, [])

// 作为其他 hooks 的依赖项
const updateDocumentTheme = useCallback((newTheme: Theme) => {
  const effectiveTheme = newTheme === 'system' ? getSystemTheme() : newTheme
  document.documentElement.className = effectiveTheme
}, [getSystemTheme]) // 依赖 getSystemTheme
```

2. **useEffect 的应用**：
```typescript
// 监听系统主题变化
useEffect(() => {
  // 1. 初始化
  setMounted(true)
  const savedTheme = localStorage.getItem('theme') as Theme || 'system'
  
  // 2. 设置监听器
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleSystemThemeChange)
  
  // 3. 清理函数
  return () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }
}, [handleSystemThemeChange])
```

### 为什么要一起使用？

在主题切换组件中：

1. `useCallback` 确保函数引用稳定，避免不必要的 effect 重新执行

2. `useEffect` 处理副作用（如事件监听、DOM 修改）

3. 两者配合使用可以避免性能问题和内存泄漏

例如：
```typescript
// 函数被缓存
const handleSystemThemeChange = useCallback((e: MediaQueryListEvent) => {
  if (theme === 'system') {
    document.documentElement.className = e.matches ? 'dark' : 'light'
  }
}, [theme])

// 使用缓存的函数作为依赖
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleSystemThemeChange)
  
  return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
}, [handleSystemThemeChange]) // 只有当 handleSystemThemeChange 变化时才重新设置监听器
```