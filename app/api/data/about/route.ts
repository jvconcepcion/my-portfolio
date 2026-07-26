import { NextResponse } from 'next/server';
import { getSkills, getExperience, getEducation } from '@lib/settings';

export async function GET() {
  try {
    const [skills, experience, education] = await Promise.all([
      getSkills(),
      getExperience(),
      getEducation(),
    ]);
    return NextResponse.json({ skills, experience, education });
  } catch (e: unknown) {
    console.error('Error:', e);
    return NextResponse.json({ error: 'Failed to load about data' }, { status: 500 });
  }
}
