import { NextResponse } from 'next/server';
import { signupUser } from '@/app/controllers/authController';

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await signupUser(body);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error, issues: result.issues || null },
        { status: result.status || 400 }
      );
    }

    return NextResponse.json(result.data, { status: result.status || 201 });
  } catch (err) {
    console.error('POST /api/signup error:', err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
