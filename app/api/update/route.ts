import { NextRequest, NextResponse } from 'next/server';
import { getAllIndicators } from '@/lib/dataFetcher';
import { appendToHistory } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const indicators = await getAllIndicators();
    const dateStr = new Date().toISOString().split('T')[0];
    await appendToHistory(dateStr, indicators);

    return NextResponse.json({
      status: 'success',
      indicators,
      message: 'Data updated successfully'
    });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to update data' },
      { status: 500 }
    );
  }
}
