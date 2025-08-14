import { NextResponse } from 'next/server';
import { fetchHeroSection } from '@/lib/contentful-api';

export async function GET() {
  try {
    const result = await fetchHeroSection();
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch hero section data' }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
