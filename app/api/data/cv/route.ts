import { NextResponse } from 'next/server';
import { getCV } from '@lib/settings';
import { CVResponse } from '@interfaces';

export async function GET() {
  try {
    const cv: string = await getCV();
    const response: CVResponse = { cv };
    return NextResponse.json(response);
  } catch (e: unknown) {
    console.error('Error:', e);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  };
}