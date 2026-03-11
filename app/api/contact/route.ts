import { NextRequest } from 'next/server';

/**
 * POST /api/contact
 * Sends a contact message. Currently logs to console and returns success.
 * To enable email delivery, set CONTACT_EMAIL in .env.local and add nodemailer.
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Log the message (extend with nodemailer / Resend / SendGrid as needed)
    console.log('Contact form submission:', { name, email, message, to: process.env.CONTACT_EMAIL });

    return Response.json({ message: 'Message received. Thank you!' });
  } catch (err) {
    console.error('contact error', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
