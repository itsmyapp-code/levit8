import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Proxy for audio fingerprinting identification (e.g. AudD)
  return NextResponse.json({ status: 'standby' });
}
