import { NextResponse } from "next/server";
import OpenAI from "openai";
import { CustomError } from '@interfaces'

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.OPENAI_API_KEY
});

const resumeContent = `
  John Doe - Full Stack Developer
  Experience:
  - Senior Developer at Tech Corp (2020-present)
  - Built 10+ web applications using Next.js
  Skills: React, Node.js, AI Integration
  Education: B.S. Computer Science - MIT
  Contact: john@portfolio.com
`;


export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: "Method not Allowed" }, { status: 500 });
  }

  try {
    const { messages } = await req.json();
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional assistant for John Doe. 
          Answer questions strictly based on this resume: ${resumeContent}
          If asked about something not in the resume, respond:
          "I don't have that information, but you can contact John directly."`
        },
        ...messages
      ],
      temperature: 0.3
    });

    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (e: unknown) {
    const error = e as CustomError;
    console.error("error");
    if (error.status === 402) {
      return NextResponse.json(
        { error: "Insufficient API balance. Please check your DeepSeek account." },
        { status: 402 }
      );
    }

    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}