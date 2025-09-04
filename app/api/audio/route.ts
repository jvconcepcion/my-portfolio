import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const track = searchParams.get('track');

  if (!track) {
    return new Response(JSON.stringify({ error: 'Track parameter is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Prevent directory traversal
  const safeTrack = path.basename(track);

  // Path to private audio
  const filePath = path.join(process.cwd(), 'private', 'bgm', safeTrack);

  if (!fs.existsSync(filePath)) {
    return new Response(JSON.stringify({ error: 'Track not found.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const fileStream = fs.createReadStream(filePath);

  return new Response(fileStream as any, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline',
    },
  });
}