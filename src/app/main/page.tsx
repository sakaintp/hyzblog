"use client"
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

export default function NewPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">新页面</h1>
      <Button onPress={() => router.back()}>返回首页</Button>
    </div>
  )
}