import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: Number(process.env.SMTP_PORT) || 1025,
  secure: false,
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default {
  async send(data: ContactData) {
    const { name, email, subject, message } = data;

    await transporter.sendMail({
      from: process.env.SMTP_USER || 'noreply@localhost',
      replyTo: email,
      to: process.env.CONTACT_EMAIL || 'a@gmail.com',
      subject: `[Contacto Web] ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
  },
};
