import { Component, OnInit, inject, signal, ViewChild, ElementRef, Input, computed, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { WorkService } from '@services/work.service';
import { HomeService } from '@services/home.service';
import { StrapiData, Work, Home } from '@models/strapi.model';

@Component({
  selector: 'app-featured-works',
  standalone: true,
  imports: [RouterLink, DatePipe, CommonModule],
  styleUrls: ['./featured-works.component.scss'],
  template: `
    <section class="featured">
      <div class="featured__container">
        <div class="featured__header">
          <p class="featured__label">{{ label || homeData()?.featured_label }}</p>
          <div class="featured__title-row">
            <h2 class="featured__title">{{ title || homeData()?.featured_title }}</h2>
            <div class="featured__controls" *ngIf="featuredWorks().length > 0">
              <button (click)="scroll('left')" 
                      class="featured__arrow" 
                      [disabled]="isAtStart()"
                      aria-label="Anterior">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button (click)="scroll('right')" 
                      class="featured__arrow" 
                      [disabled]="isAtEnd()"
                      aria-label="Siguiente">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        @if (featuredWorks().length > 0) {
          <div class="featured__slider-wrapper">
            <div class="featured__slider" #sliderRef (scroll)="onScroll()">
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
          </div>

          @if (showCta) {
            <div class="featured__cta">
              <a routerLink="/trabajos" class="featured__btn">
                {{ homeData()?.featured_btn || 'Ver todas' }}
              </a>
            </div>
          }
        } @else {
          <div class="featured__loading">
            <p>Cargando obras destacadas...</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class FeaturedWorksComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly workService = inject(WorkService);
  private readonly homeService = inject(HomeService);

  @Input() title: string = '';
  @Input() label: string = '';
  @Input() showCta: boolean = true;
  @Input() excludeId: number | null = null;

  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLDivElement>;

  allFeaturedWorks = signal<StrapiData<Work>[]>([]);
  featuredWorks = computed(() => {
    const exclude = this.excludeId;
    return this.allFeaturedWorks().filter(w => w.id !== exclude);
  });
  homeData = signal<Home | null>(null);
  
  isAtStart = signal(true);
  isAtEnd = signal(false);

  ngOnInit(): void {
    this.loadHomeData();
    this.loadFeaturedWorks();
  }

  ngAfterViewInit() {
    setTimeout(() => this.onScroll(), 500);
  }

  ngOnDestroy() {}

  onScroll(): void {
    if (!this.sliderRef) return;
    const el = this.sliderRef.nativeElement;
    this.isAtStart.set(el.scrollLeft <= 5);
    this.isAtEnd.set(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
  }

  scroll(direction: 'left' | 'right'): void {
    if (!this.sliderRef) return;
    const slider = this.sliderRef.nativeElement;
    const scrollAmount = slider.clientWidth * 0.8; 
    slider.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    // El evento scroll de la tartera disparará onScroll
  }

  private loadHomeData(): void {
    this.homeService.get().subscribe({
      next: (res) => this.homeData.set(res.data),
      error: (err: unknown) => console.error('Error loading home data:', err),
    });
  }

  private loadFeaturedWorks(): void {
    this.workService.getFeatured().subscribe({
      next: (res) => {
        // No limitamos a 3, permitimos que el slider maneje todas las marcadas como featured
        this.allFeaturedWorks.set(res.data);
        setTimeout(() => this.onScroll(), 100);
      },
      error: (err: unknown) => console.error('Error loading featured works:', err),
    });
  }

  getMainImage(work: StrapiData<Work>): string {
    return this.workService.getImageUrl(work.image?.url);
  }
}
