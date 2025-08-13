import { NextResponse } from 'next/server';
import { fetchNavigation } from '@/lib/contentful-api';

export async function GET() {
  const result = await fetchNavigation();
  
  if (result.success) {
    return NextResponse.json(result);
  } else {
    return NextResponse.json(result, { status: 500 });
  }
}
