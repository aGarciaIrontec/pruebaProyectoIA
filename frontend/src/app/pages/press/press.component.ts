import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { NewsService } from '@services/news.service';
import { News, StrapiData } from '@models/strapi.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-press',
  standalone: true,
  imports: [CommonModule, DatePipe, TestimonialsComponent],
  styleUrls: ['./press.component.scss'],
  template: `
    <div class="press-page">
      <header class="press-header">
        <h1 class="press-header__title">Prensa</h1>
        <p class="press-header__subtitle">Jesús Lizaso en los medios de comunicación</p>
      </header>

      <div class="press-container">
        <div *ngIf="isLoading()" class="loading">Cargando noticias...</div>
        <div *ngIf="!isLoading() && newsList().length === 0" class="empty">No hay noticias disponibles en este momento.</div>
        <div *ngIf="!isLoading() && newsList().length > 0" class="press-grid">
          <article class="press-card" *ngFor="let item of newsList(); trackBy: trackById">
            <div class="press-card__image-container" *ngIf="item.image">
              <img [src]="getImageUrl(item.image.url)" [alt]="item.title" class="press-card__image" />
            </div>
            <div class="press-card__content">
              <div class="press-card__meta">
                <span class="press-card__date">{{ item.date | date:'longDate' }}</span>
              </div>
              <h2 class="press-card__title">{{ item.title }}</h2>
              <p class="press-card__description">{{ item.description }}</p>
              <a [href]="item.url" target="_blank" rel="noopener noreferrer" class="press-card__link">
                Leer noticia completa
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </article>
        </div>
      </div>

      <!-- TESTIMONIALS: bloque visualmente integrado -->
      <section class="press-testimonials">
        <app-testimonials />
      </section>
    </div>
  `
})
export class PressComponent implements OnInit {
  private newsService = inject(NewsService);
  
  newsList = signal<StrapiData<News>[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.newsService.getAll().subscribe({
      next: (response) => {
        this.newsList.set(response.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading news:', error);
        this.isLoading.set(false);
      }
    });
  }

  getImageUrl(url: string | undefined | null): string {
    if (!url) return '/no-image.svg';
    if (url.startsWith('http')) return url;
    return `${environment.strapiUrl}${url}`;
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
