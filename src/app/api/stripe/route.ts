import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Stripe webhook logic
  return NextResponse.json({ received: true });
}
