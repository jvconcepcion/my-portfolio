import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const track = searchParams.get('track');

  if (!track) {
    return new Response(JSON.stringify({ error: 'Track parameter is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Prevent directory traversal — only allow known filenames
  const allowed = ['california-dreamin.mp3', 'i-dont-want-to-see-tomorrow.mp3'];
  if (!allowed.includes(track)) {
    return new Response(JSON.stringify({ error: 'Track not found.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const audioUrl = `${supabaseUrl}/storage/v1/object/public/portfolio-assets/audio/${track}`;

  return Response.redirect(audioUrl, 302);
}