import { NextResponse } from 'next/server';
import { getProjects } from '@lib/settings';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({ projects });
  } catch (e: unknown) {
    console.error('Error:', e);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}
