import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WorkService } from '@services/work.service';
import { HomeService } from '@services/home.service';
import { StrapiData, StrapiResponse, Work, Home } from '@models/strapi.model';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DatePipe, HeroComponent],
  styleUrls: ['./home.component.scss'],
  template: `
    <app-hero
      [label]="homeData()?.hero_label ?? ''"
      [title]="homeData()?.hero_title ?? ''"
      [subtitle]="homeData()?.hero_subtitle ?? ''"
      [btn]="homeData()?.hero_btn ?? ''"
      [heroImageUrl]="getHeroImage()"
    />

    <!-- FEATURED WORKS -->
    <section class="featured">
      <div class="featured__container">
        <div class="featured__header">
          <p class="featured__label">{{ homeData()?.featured_label }}</p>
          <h2 class="featured__title">{{ homeData()?.featured_title }}</h2>
        </div>

        @if (featuredWorks().length > 0) {
          <div class="featured__grid">
            @for (work of featuredWorks(); track work.id) {
              <a [routerLink]="['/trabajos', work.slug]" class="work-card">
                <div class="work-card__image-wrapper">
                  <img
                    [src]="getMainImage(work)"
                    [alt]="work.title"
                    class="work-card__image"
                    loading="lazy"
                  />
                  <div class="work-card__overlay"></div>
                  @if (work.category) {
                    <span class="work-card__badge">
                      {{ work.category }}
                    </span>
                  }
                </div>
                <div class="work-card__content">
                  <h3 class="work-card__title">{{ work.title }}</h3>
                  @if (work.date) {
                    <p class="work-card__date">{{ work.date | date:'yyyy' }}</p>
                  }
                </div>
              </a>
            }
          </div>

          <div class="featured__cta">
            <a routerLink="/trabajos" class="featured__btn">
              {{ homeData()?.featured_btn }}
            </a>
          </div>
        } @else {
          <div class="featured__loading">
            <p>Cargando obras destacadas...</p>
          </div>
        }
      </div>
    </section>

    <!-- ARTIST SECTION -->
    <section class="artist">
      <div class="artist__container">
        <div class="artist__grid">
          <div class="artist__image-wrapper">
            <img
              [src]="getArtistImage()"
              alt="El Artista"
              class="artist__image"
              loading="lazy"
            />
          </div>

          <div class="artist__content">
            <p class="artist__label">{{ homeData()?.artist_label }}</p>
            <h2 class="artist__title" [innerHTML]="homeData()?.artist_title"></h2>
            <div class="artist__bio" [innerHTML]="homeData()?.artist_bio"></div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private readonly workService = inject(WorkService);
  private readonly homeService = inject(HomeService);

  featuredWorks = signal<StrapiData<Work>[]>([]);
  homeData = signal<Home | null>(null);

  ngOnInit(): void {
    this.homeService.get().subscribe({
      next: (res) => this.homeData.set(res.data),
      error: (err: unknown) => console.error('Error loading home data:', err),
    });

    this.workService.getFeatured().subscribe({
      next: (res: StrapiResponse<Work>) => this.featuredWorks.set(res.data),
      error: (err: unknown) => console.error('Error loading featured works:', err),
    });
  }

  getMainImage(work: StrapiData<Work>): string {
    return this.workService.getImageUrl(work.image?.url);
  }

  getHeroImage(): string | null {
    const url = this.homeData()?.hero_image?.url;
    return url ? this.homeService.getImageUrl(url) : null;
  }

  getArtistImage(): string {
    const url = this.homeData()?.artist_image?.url;
    return this.homeService.getImageUrl(url);
  }
}
