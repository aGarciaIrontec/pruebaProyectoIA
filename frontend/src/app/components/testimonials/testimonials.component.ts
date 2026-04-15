import { Component, OnInit, inject, signal } from '@angular/core';
import { TestimonialService } from '@services/testimonial.service';
import { StrapiData, Testimonial } from '@models/strapi.model';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  styleUrls: ['./testimonials.component.scss'],
  template: `
    <section class="testimonials">
      <div class="testimonials__container">
        <div class="testimonials__header">
          <p class="testimonials__label">Testimonios</p>
          <h2 class="testimonials__title">Lo que dicen nuestros clientes</h2>
        </div>

        @if (testimonials().length > 0) {
          <div class="testimonials__grid">
            @for (t of testimonials(); track t.id) {
              <div class="testimonial-card">
                <blockquote class="testimonial-card__quote">
                  "{{ t.text }}"
                </blockquote>
                <div class="testimonial-card__author">
                  <div class="testimonial-card__avatar-placeholder">
                    {{ t.username.charAt(0) }}
                  </div>
                  <p class="testimonial-card__name">{{ t.username }}</p>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class TestimonialsComponent implements OnInit {
  private readonly testimonialService = inject(TestimonialService);

  testimonials = signal<StrapiData<Testimonial>[]>([]);

  ngOnInit(): void {
    this.testimonialService.getAll().subscribe({
      next: (res) => this.testimonials.set(res.data),
      error: (err: unknown) => console.error('Error loading testimonials:', err),
    });
  }
}
