import { NextRequest, NextResponse } from 'next/server';
import { loadHistory } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const history = await loadHistory();
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
