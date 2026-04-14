import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { WorkService } from '@services/work.service';
import { StrapiData, StrapiResponse, Work } from '@models/strapi.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, DatePipe],
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
  template: `
    <!-- Header -->
    <section class="gallery-header">
      <div class="container">
        <h1 class="title">Trabajos</h1>
      </div>
    </section>

    <!-- Filter Bar -->
    <section class="filter-bar">
      <div class="container">
        <div class="filter-buttons">
          <button
            (click)="setFilter('Todos')"
            [class.active]="selectedCategory() === 'Todos'"
            class="filter-btn"
          >
            Todos
          </button>
          @for (cat of categories; track cat) {
            <button
              (click)="setFilter(cat)"
              [class.active]="selectedCategory() === cat"
              class="filter-btn"
            >
              {{ cat }}
            </button>
          }
        </div>
        <p class="results-count">{{ filteredWorks().length }} obras</p>
      </div>
    </section>

    <!-- Gallery Content -->
    <section class="gallery-content">
      <div class="container">
        @if (loading()) {
          <div class="loading-container">
            <div class="spinner"></div>
          </div>
        } @else if (filteredWorks().length === 0) {
          <div class="empty-state">
            <p>No se encontraron trabajos en esta categoría.</p>
          </div>
        } @else {
          <div class="works-grid" [@fadeIn]>
            @for (work of filteredWorks(); track work.id) {
              <a [routerLink]="['/trabajos', work.slug]" class="work-card">
                <div class="work-image">
                  <img
                    [src]="getMainImage(work)"
                    [alt]="work.title"
                    loading="lazy"
                  />
                  @if (work.category) {
                    <span class="category-badge">
                      {{ work.category }}
                    </span>
                  }
                </div>
                
                <div class="work-info">
                  <h3 class="work-title">{{ work.title }}</h3>
                  <div class="work-meta">
                    @if (work.date) {
                      <span class="meta-year">{{ work.date | date:'yyyy' }}</span>
                    }
                    @if (work.materials && work.materials.length > 0) {
                      <span class="meta-separator">·</span>
                      <span class="meta-material">{{ work.materials.join(', ') }}</span>
                    }
                  </div>
                </div>
              </a>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class GalleryComponent implements OnInit {
  private readonly workService = inject(WorkService);

  allWorks = signal<StrapiData<Work>[]>([]);
  loading = signal(true);
  selectedCategory = signal<'Todos' | Work['category']>('Todos');
  
  categories: Work['category'][] = ['Escultura', 'Pintura', 'Fotografía', 'Abstracto', 'Realismo', 'Cerámica'];

  filteredWorks = computed(() => {
    const category = this.selectedCategory();
    const works = this.allWorks();
    
    if (category === 'Todos') {
      return works;
    }
    
    return works.filter(work => work.category === category);
  });

  ngOnInit(): void {
    this.loadWorks();
  }

  setFilter(category: 'Todos' | Work['category']): void {
    this.selectedCategory.set(category);
  }

  getMainImage(work: StrapiData<Work>): string {
    return this.workService.getImageUrl(work.image?.url);
  }

  private loadWorks(): void {
    this.loading.set(true);
    this.workService.getAll().subscribe({
      next: (res: StrapiResponse<Work>) => {
        this.allWorks.set(res.data);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        console.error('Error loading works:', err);
        this.loading.set(false);
      },
    });
  }
}
