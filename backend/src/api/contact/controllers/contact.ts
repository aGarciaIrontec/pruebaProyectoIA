import contactService from '../services/contact';

export default {
  async send(ctx) {
    const { name, email, subject, message } = ctx.request.body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (!name || !email || !subject || !message) {
      return ctx.badRequest('Todos los campos son obligatorios.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ctx.badRequest('El formato del email no es válido.');
    }

    try {
      await contactService.send({ name, email, subject, message });
      ctx.send({ ok: true, message: 'Email enviado correctamente.' });
    } catch (err) {
      strapi.log.error('Error enviando email de contacto:', err);
      return ctx.internalServerError('No se pudo enviar el email. Inténtalo más tarde.');
    }
  },
};
