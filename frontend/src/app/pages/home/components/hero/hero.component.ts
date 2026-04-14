import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero__overlay"></div>
      <div class="hero__bg" [style.background-image]="heroImageUrl() ? 'url(' + heroImageUrl() + ')' : ''"></div>

      <div class="hero__content">
        <p class="hero__label">{{ label() }}</p>
        <h1 class="hero__title">{{ title() }}</h1>
        <p class="hero__subtitle">{{ subtitle() }}</p>
        <a routerLink="/trabajos" class="hero__cta">
          {{ btn() }}
        </a>
      </div>

      <div class="hero__scroll-indicator">
        <div class="hero__scroll-line"></div>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  label = input('');
  title = input('');
  subtitle = input('');
  btn = input('');
  heroImageUrl = input<string | null>(null);
}
