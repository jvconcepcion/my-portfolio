import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { CustomError } from '@interfaces';
import { decryptEnvSecret } from '@lib/decrypt';
import { getResumeContent, getAIGreetings, getAIQuotaExceeded, setAIQuotaExceeded } from '@lib/settings';

const apiKey = decryptEnvSecret(
  process.env.OPENAI_KEY_ENCRYPTED!,
  process.env.OPENAI_KEY_PASSWORD!
);

const openai = new OpenAI({ apiKey });

let lastActivity = Date.now(); // Track AI activity time
let quotaExceeded = false; // Track if OpenAI quota is exhausted

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

    // Scaeva's Resume Content (My Portfolio Info) stored from firestore
    const resumeContent = await getResumeContent();

    // Handle Chat UI Initial Launch Trigger
    if (userMessage === '__init__') {
      const reply = await getAIGreetings();
      return NextResponse.json({ reply });
    }

    // Detect Greetings stored from firestore and Provide an Intro Instead
    if (/^(hi|hello|hey|good\s(morning|afternoon|evening))$/.test(userMessage)) {
      const reply = await getAIGreetings();
      return NextResponse.json({ reply });
    }

    // 🌟 If Not a Greeting, Use OpenAI for Responses
    const response = await openai.chat.completions.create({
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
      temperature: 0.3
    });

    const reply = response.choices?.[0]?.message?.content ?? "I'm unable to respond at the moment.";
    return NextResponse.json({ reply });

  } catch (e: unknown) {
    console.error('Error:', e);

    const error = e as CustomError;
    const isQuotaError =
      error?.status === 429 ||
      error?.code === 'insufficient_quota' ||
      error?.response?.status === 402;

    if (isQuotaError) {
      quotaExceeded = true;
      await setAIQuotaExceeded(true);
      return NextResponse.json(
        { error: 'Insufficient API balance. Please check your OpenAI account.' },
        { status: 429 }
      );
    }

    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}

// 🌐 GET API - AI Status
export async function GET() {
  // Check in-memory flag first, fall back to Firestore (survives server restarts)
  if (!quotaExceeded) {
    quotaExceeded = await getAIQuotaExceeded();
  }

  if (quotaExceeded) {
    return NextResponse.json({ status: 'quota_exceeded' });
  }

  const now = Date.now();
  const elapsed = now - lastActivity;
  const status = elapsed < 30000 ? 'active' : elapsed < 60000 ? 'idle' : 'offline';

  return NextResponse.json({ status });
}
