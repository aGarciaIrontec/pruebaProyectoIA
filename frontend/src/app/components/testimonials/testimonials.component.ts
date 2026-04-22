import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '@services/testimonial.service';
import { StrapiData, Testimonial } from '@models/strapi.model';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./testimonials.component.scss'],
  template: `
    <section class="testimonials">
      <div class="testimonials__container">
        <div class="testimonials__header">
          <p class="testimonials__label">Testimonios</p>
          <h2 class="testimonials__title">Lo que dicen nuestros clientes</h2>
        </div>

        @if (testimonials().length > 0) {
          <div class="testimonials__slider-wrapper">
            <button class="slider-arrow left" (click)="prev()" [disabled]="currentIndex === 0" aria-label="Anterior">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div class="testimonials__slider">
              @for (t of visibleTestimonials(); track t.id) {
                <div class="testimonial-card">
                  <blockquote class="testimonial-card__quote">
                    {{ t.text }}
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
            <button class="slider-arrow right" (click)="next()" [disabled]="currentIndex + visibleCount >= testimonials().length" aria-label="Siguiente">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        }
      </div>
    </section>
  `,
})
export class TestimonialsComponent implements OnInit {
  private readonly testimonialService = inject(TestimonialService);

  testimonials = signal<StrapiData<Testimonial>[]>([]);
  currentIndex = 0;
  visibleCount = 2;

  ngOnInit(): void {
    this.testimonialService.getAll().subscribe({
      next: (res) => this.testimonials.set(res.data),
      error: (err: unknown) => console.error('Error loading testimonials:', err),
    });
  }

  visibleTestimonials() {
    return this.testimonials().slice(this.currentIndex, this.currentIndex + this.visibleCount);
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex + this.visibleCount < this.testimonials().length) {
      this.currentIndex++;
    }
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
