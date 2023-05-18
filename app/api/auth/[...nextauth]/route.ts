import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import path from 'path';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import prisma from '@/lib/prisma';
// Email sender
// Crea un objeto transportador reutilizables utilizando el transportador SMTP por defecto
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
} as SMTPTransport.Options); // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35847

const emailsDir = path.resolve(process.cwd(), 'emails');

const sendVerificationRequest = ({ identifier, url }: {identifier: string, url: string}) => {
  const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
    encoding: 'utf8',
  });
  const emailTemplate = Handlebars.compile(emailFile);
  // Enviar correo con objeto de transporte definido 
  transporter.sendMail({
    from: `"Enviado por " ${process.env.EMAIL_FROM}`, // Dirección del remitenet
    to: identifier, // lsita de destinatarios
    subject: 'Se acaba de autenticar con Next Auth - Email', // Línea de asunto
    html: emailTemplate({
      // base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

const handler = NextAuth({
  pages: {
    signIn: '/saludos',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
  },
  providers: [
    EmailProvider({
      maxAge: 10 * 60,
      sendVerificationRequest,
    }),
  ],
  adapter: PrismaAdapter(prisma),

});

export { handler as GET, handler as POST }