// src/app/api/daily_leaderboard/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyQuickAuth } from '@/lib/quick-auth-utils';

export async function GET(req: NextRequest) {
  try {
    const fid = await verifyQuickAuth(req);

    const backendUrl = `http://localhost:5009/api/v1/user/leaderboard/daily?fid=${fid}`;

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Backend error:', errorText);
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e: any) {
    console.error('❌ API /weekly_leaderboard error:', e.message);
    return NextResponse.json({ message: e.message }, { status: 401 });
  }
}
