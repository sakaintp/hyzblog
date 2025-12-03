import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { messages } = await req.json()
  try {
    // 这里替换为实际的DeepSeek API调用
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    const data = await response.json()
    return NextResponse.json({ message: data.choices[0].message.content })
  } catch (error) {
    return NextResponse.json(
      { message: '请求失败，请稍后再试' },
      { status: 500 }
    )
  }
}