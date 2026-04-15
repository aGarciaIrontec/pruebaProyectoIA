import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WorkService } from '@services/work.service';
import { StrapiData, Work } from '@models/strapi.model';
import { FeaturedWorksComponent } from '../../components/featured-works/featured-works.component';

@Component({
  selector: 'app-work-detail',
  standalone: true,
  imports: [DatePipe, FeaturedWorksComponent],
  styleUrls: ['./work-detail.component.scss'],
  template: `
    @if (loading()) {
      <div class="loading-container">
        <div class="spinner"></div>
      </div>
    } @else if (work()) {
      <div class="work-container">
        <!-- Header with Title -->
        <header class="work-header">
          <h1 class="work-title">{{ work()!.title }}</h1>
          
          <!-- Main Metadata -->
          <div class="work-metadata">
            @if (work()!.date) {
              <div class="metadata-item">
                <p class="label">Fecha</p>
                <p class="value">{{ work()!.date | date:'mediumDate' }}</p>
              </div>
            }
            @if (work()!.materials && work()!.materials.length > 0) {
              <div class="metadata-item">
                <p class="label">Materiales</p>
                <div class="material-chips">
                  @for (material of work()!.materials; track material) {
                    <span class="chip">{{ material }}</span>
                  }
                </div>
              </div>
            }
            @if (work()!.category) {
              <div class="metadata-item">
                <p class="label">Categoría</p>
                <p class="value">{{ work()!.category }}</p>
              </div>
            }
          </div>
        </header>

        <!-- Image + Description side by side -->
        <section class="work-main">
          <div class="work-main__container">
            <div class="work-main__image">
              <div class="gallery">
                <div class="gallery__main">
                  <img
                    [src]="selectedImage()"
                    [alt]="work()!.title"
                    loading="eager"
                  />
                </div>

                @if (allImages().length > 1) {
                  <div class="gallery__thumbs">
                    @for (img of allImages(); track img) {
                      <button
                        class="gallery__thumb"
                        [class.gallery__thumb--active]="selectedImage() === img"
                        (click)="selectImage(img)"
                        type="button"
                      >
                        <img [src]="img" [alt]="work()!.title" loading="lazy" />
                      </button>
                    }
                  </div>
                }
              </div>
            </div>

            <div class="work-main__info">
              @if (work()!.description) {
                <h2 class="description-title">Sobre esta obra</h2>
                <div class="rich-text" [innerHTML]="formatDescription(work()!.description)"></div>
              }
            </div>
          </div>
        </section>

        <!-- FEATURED WORKS (Reutilizado) -->
        <app-featured-works 
          title="Otras obras destacadas" 
          label="Sugerencias" 
          [showCta]="false" 
        />
      </div>
    }
  `,
})
export class WorkDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly workService = inject(WorkService);

  work = signal<StrapiData<Work> | null>(null);
  loading = signal(true);
  selectedImage = signal<string>('');

  allImages = computed<string[]>(() => {
    const w = this.work();
    if (!w) return [];
    const imgs: string[] = [];
    if (w.image?.url) imgs.push(this.workService.getImageUrl(w.image.url));
    if (w.other_images?.length) {
      for (const img of w.other_images) {
        if (img?.url) imgs.push(this.workService.getImageUrl(img.url));
      }
    }
    return imgs;
  });

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.workService.getBySlug(slug).subscribe({
        next: (res) => {
          if (res.data.length > 0) {
            this.work.set(res.data[0]);
            this.selectedImage.set(this.workService.getImageUrl(res.data[0].image?.url));
          }
          this.loading.set(false);
        },
        error: (err: unknown) => {
          console.error('Error loading work:', err);
          this.loading.set(false);
        },
      });
    } else {
      this.loading.set(false);
    }
  }

  selectImage(url: string): void {
    this.selectedImage.set(url);
  }

  getMainImage(): string {
    const w = this.work();
    if (!w) return '';
    return this.workService.getImageUrl(w.image?.url);
  }

  formatDescription(desc: string): string {
    // Si ya viene con etiquetas HTML, no tocamos
    if (desc.includes('<p') || desc.includes('<br') || desc.includes('<ul') || desc.includes('<ol')) {
      return desc;
    }
    // Si viene como texto plano, convertimos saltos de línea en <br>
    return desc.replace(/\n/g, '<br>');
  }
}
