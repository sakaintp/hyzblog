"use client"
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
const liList = [
  <div key={1}>11111</div>,
  <div key={2}>2222</div>,
  <div key={3}>333</div>,
  <div key={4}>4444</div>,
  <div key={5}>5555</div>
]
export default function NewPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      {liList}
    </div>
  )
}