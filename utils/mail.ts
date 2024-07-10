import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transport = nodemailer.createTransport({
  host: process.env.NEXT_EMAIL_HOST,
  port: process.env.NEXT_EMAIL_PORT,
  auth: {
    user: process.env.NEXT_EMAIL_USER,
    pass: process.env.BREVO_API_KEY,
  },
} as SMTPTransport.Options);

type EmailOptions = {
  name: string;
  email: string;
  message: string;
};
export const sendEmail = async (doc: EmailOptions) => {
  const { name, email, message } = doc;
  return await transport.sendMail({
    from: process.env.NEXT_EMAIL_PERSONALUSER,
    to: process.env.NEXT_EMAIL_PERSONALUSER,
    subject: 'Contacto desde my portfolio',
    html: createEmail(message, email, name),
  });
};

const createEmail = (text: string, email: string, name: string) => {
  return `
  <div>
  <h2>Hi my name is: ${name}</h2>
  <p>My email is: ${email}</p>
  <p> And im contacting you for: ${text}</p>
  </div>
  `;
};
