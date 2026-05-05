import { NextRequest, NextResponse } from 'next/server';
import { getAllIndicators } from '@/lib/dataFetcher';
import { getLatestIndicators } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    // Try to get from cache first
    const cached = await getLatestIndicators();
    if (cached && isRecentData(cached.timestamp)) {
      return NextResponse.json(cached);
    }

    // Otherwise fetch fresh data
    const indicators = await getAllIndicators();
    return NextResponse.json(indicators);
  } catch (error) {
    console.error('Error fetching current indicators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch indicators' },
      { status: 500 }
    );
  }
}

function isRecentData(timestamp: string): boolean {
  const lastUpdate = new Date(timestamp);
  const now = new Date();
  const diffMinutes = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);
  return diffMinutes < 60; // Cache for 1 hour
}
