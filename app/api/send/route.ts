import { sendEmail } from '@/utils/mail';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const result = await sendEmail(body);
    console.log(result);

    return Response.json({ message: 'Email sent' }, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return Response.json({ error: 'Error sending email' }, { status: 500 });
  }
}
