import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '@services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="contact">
      <div class="contact__container">
        <div class="contact__header">
          <h1 class="contact__title">Contacto</h1>
          <p class="contact__subtitle">
            Si tienes alguna pregunta, deseas consultar disponibilidad de una obra o solicitar un encargo personalizado, por favor completa el siguiente formulario.
          </p>
        </div>

        @if (sent()) {
          <div class="contact__success">
            <p>✓ Tu mensaje ha sido enviado correctamente. Te responderemos lo antes posible.</p>
          </div>
        } @else {
          <form class="contact__form" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Nombre</label>
              <input type="text" id="name" name="name" [(ngModel)]="name" placeholder="Tu nombre completo" required />
            </div>

            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" [(ngModel)]="email" placeholder="hola@example.com" required />
            </div>

            <div class="form-group">
              <label for="subject">Asunto</label>
              <input type="text" id="subject" name="subject" [(ngModel)]="subject" placeholder="¿En qué puedo ayudarte?" required />
            </div>

            <div class="form-group">
              <label for="message">Mensaje</label>
              <textarea id="message" name="message" [(ngModel)]="message" rows="6" placeholder="Cuéntame más sobre tu interés..." required></textarea>
            </div>

            @if (error()) {
              <p class="contact__error">{{ error() }}</p>
            }

            <button type="submit" class="contact__submit" [disabled]="sending()">
              {{ sending() ? 'Enviando...' : 'Enviar mensaje' }}
            </button>
          </form>
        }
      </div>
    </section>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private readonly contactService = inject(ContactService);

  name = '';
  email = '';
  subject = '';
  message = '';

  sending = signal(false);
  sent = signal(false);
  error = signal('');

  onSubmit() {
    if (!this.name || !this.email || !this.subject || !this.message) {
      this.error.set('Todos los campos son obligatorios.');
      return;
    }

    this.sending.set(true);
    this.error.set('');

    this.contactService.send({
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
    }).subscribe({
      next: () => {
        this.sending.set(false);
        this.sent.set(true);
      },
      error: () => {
        this.sending.set(false);
        this.error.set('No se pudo enviar el mensaje. Inténtalo más tarde.');
      },
    });
  }
}
