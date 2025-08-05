// File: app/api/waitlist/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    // This is where you would save the email to a database (e.g., Supabase, Vercel Postgres)
    // or send it to a mailing list service (e.g., Mailchimp).
    console.log(`Email received for waitlist: ${email}`);

    return NextResponse.json({ message: 'Successfully joined waitlist!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}