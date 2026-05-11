const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const BUCKET = 'portfolio-assets';

export function storageUrl(path: string): string {
  if (!SUPABASE_URL) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
