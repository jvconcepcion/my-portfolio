import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { CustomError } from '@interfaces';
import { decrypt } from '@lib/decrypt';
import { getResumeContent, getAIGreetings } from '@lib/settings';

// Initialize OpenAI only once (singleton pattern)
let openai: OpenAI;

async function initializeOpenAI() {
  if (!openai) {
    const apiKey = await decrypt(
      process.env.OPENAI_KEY_ENCRYPTED!,
      process.env.OPENAI_KEY_PASSWORD!
    );
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

let lastActivity = Date.now();

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

    // Preload data in parallel
    const [resumeContent, greetings, openaiInstance] = await Promise.all([
      getResumeContent(),
      getAIGreetings(),
      initializeOpenAI()
    ]);

    // Handle special cases
    if (userMessage === '__init__' || /^(hi|hello|hey|good\s(morning|afternoon|evening))$/.test(userMessage)) {
      lastActivity = Date.now();
      return NextResponse.json({ reply: greetings });
    }

    // AI Response
    const response = await openaiInstance.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are Scaeva, Nathan's AI assistant. 
            Your role is to assist with programming, technology, and AI-related queries.
            All responses must use proper HTML formatting (e.g., <strong>bold</strong>, <em>italic</em>, <br /> for new lines).
            If an employer or recruiter asks about Nathan, introduce him based on this profile: 
            ${resumeContent}`
        },
        ...messages
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    lastActivity = Date.now();
    const reply = response.choices?.[0]?.message?.content || "I'm unable to respond at the moment.";
    return NextResponse.json({ reply });

  } catch (e: unknown) {
    console.error('AI Error:', e);

    const error = e as CustomError;
    if (error?.status === 402 || error?.response?.status === 402) {
      return NextResponse.json(
        { error: 'Insufficient API balance. Please check your OpenAI account.' },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { error: 'AI request failed', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const now = Date.now();
  const elapsed = now - lastActivity;
  const status = elapsed < 30000 ? 'active' : elapsed < 60000 ? 'idle' : 'offline';
  return NextResponse.json({ status, lastActivity: new Date(lastActivity).toISOString() });
}