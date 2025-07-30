import { NextResponse } from 'next/server';
import { decryptEnvSecret } from '@lib/decrypt';

const apiKey = decryptEnvSecret(
  process.env.OPENAI_KEY_ENCRYPTED!,
  process.env.OPENAI_KEY_PASSWORD!
);

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const ttsRes = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text,
        voice: 'sage',
        response_format: 'mp3',
      }),
    });

    if (!ttsRes.ok) {
      return NextResponse.json({ error: 'OpenAI TTS failed' }, { status: 500 });
    }

    const audioBuffer = await ttsRes.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');
    const audioUrl = `data:audio/mp3;base64,${audioBase64}`;

    return NextResponse.json({ audioUrl });
  } catch (e) {
    console.error('TTS Error:', e);
    return NextResponse.json({ error: 'TTS request failed' }, { status: 500 });
  }
}