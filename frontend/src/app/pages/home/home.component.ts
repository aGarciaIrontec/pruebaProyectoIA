import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HomeService } from '@services/home.service';
import { Home } from '@models/strapi.model';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturedWorksComponent } from '../../components/featured-works/featured-works.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, FeaturedWorksComponent, RouterLink],
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
    <app-featured-works />

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
            <div class="artist__bio">
              @for (paragraph of getBioParagraphs(); track $index) {
                <p>{{ paragraph }}</p>
              }
            </div>
            @if(homeData()?.artist_menu_label) {
              <a routerLink="/biografia" class="artist__btn">{{ homeData()?.artist_menu_label}}</a>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private readonly homeService = inject(HomeService);

  homeData = signal<Home | null>(null);

  ngOnInit(): void {
    this.homeService.get().subscribe({
      next: (res) => this.homeData.set(res.data),
      error: (err: unknown) => console.error('Error loading home data:', err),
    });
  }

  getBioParagraphs(): string[] {
    const bio = this.homeData()?.artist_bio;
    if (!bio) return [];
    return bio.split('\n').filter(p => p.trim().length > 0);
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
