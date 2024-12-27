``` js
    创建 MutationObserver 来监听类名变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme()
        }
      })
    })

    // 开始观察 document.documentElement 的类名变化
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
```


## 解析

### 代码详解

```typescript
// 1. 创建观察器实例
const observer = new MutationObserver((mutations) => {
  // mutations 是 MutationRecord 对象的数组
  mutations.forEach((mutation) => {
    // 检查变化的是否是 class 属性
    if (mutation.attributeName === 'class') {
      checkTheme()
    }
  })
})

// 2. 配置和启动观察器
observer.observe(document.documentElement, {
  // 观察配置选项
  attributes: true,           // 观察属性变化
  attributeFilter: ['class']  // 只观察 class 属性
})

// 3. 清理观察器
return () => observer.disconnect()
```

### MutationObserver 的配置选项

完整的配置选项包括：

- attributes: boolean,        // 是否观察属性变化
- attributeFilter: string[], // 要观察的特定属性名数组
- attributeOldValue: boolean,// 是否记录属性的上一个值
- characterData: boolean,    // 是否观察文本内容变化
- characterDataOldValue: boolean,
- childList: boolean,        // 是否观察子节点变化
- subtree: boolean          // 是否观察后代节点


### MutationRecord 对象

每当发生变化时，回调函数会收到 `MutationRecord` 对象数组，包含以下信息：

- type: string, // 变化类型，如 'attributes', 'characterData', 'childList' 等
- target: Node, // 发生变化的节点
- addedNodes: NodeList, // 新增的节点
- removedNodes: NodeList, // 移除的节点
- previousSibling: Node | null, // 变化前的前一个兄弟节点
- nextSibling: Node | null, // 变化后的后一个兄弟节点
- attributeName: string | null, // 变化的属性名
- oldValue: string | null, // 变化前的属性值或文本内容


### 实际应用示例

1. 监听属性变化：
```typescript
// 监听所有属性变化
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log(`${mutation.attributeName} 属性发生变化`);
  });
});

observer.observe(element, {
  attributes: true
});
```

2. 监听子节点变化：
```typescript
// 监听子节点的添加和删除
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) {
      console.log('新增节点：', mutation.addedNodes);
    }
    if (mutation.removedNodes.length) {
      console.log('删除节点：', mutation.removedNodes);
    }
  });
});

observer.observe(element, {
  childList: true
});
```

### 使用注意事项

1. 性能考虑：
```typescript
// 尽可能具体地设置观察选项
observer.observe(element, {
  attributeFilter: ['class'], // 比 attributes: true 更高效
  childList: false,
  subtree: false
});
```

2. 及时清理：
```typescript
// 在组件卸载时清理观察器
useEffect(() => {
  const observer = new MutationObserver(callback);
  observer.observe(element, config);
  
  return () => observer.disconnect();
}, []);
```
在你的代码中，MutationObserver 被用来监听文档根元素的 class 变化，这是实现主题切换的一种优雅方式。当主题变化时（class 改变），观察器会立即捕获到这个变化并触发相应的处理函数。