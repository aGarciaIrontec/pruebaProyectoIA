import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  StrapiResponse,
  Work,
} from '@models/strapi.model';

@Injectable({ providedIn: 'root' })
export class WorkService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.strapiApiUrl}/works`;

  getAll(): Observable<StrapiResponse<Work>> {
    const params = new HttpParams()
      .set('populate', '*')
      .set('sort', 'date:desc');

    return this.http.get<StrapiResponse<Work>>(this.apiUrl, { params });
  }

  getFeatured(): Observable<StrapiResponse<Work>> {
    const params = new HttpParams()
      .set('populate', '*')
      .set('filters[featured][$eq]', 'true')
      .set('sort', 'date:desc');

    return this.http.get<StrapiResponse<Work>>(this.apiUrl, { params });
  }

  getBySlug(slug: string): Observable<StrapiResponse<Work>> {
    const params = new HttpParams()
      .set('populate', '*')
      .set('filters[slug][$eq]', slug);

    return this.http.get<StrapiResponse<Work>>(this.apiUrl, { params });
  }

  getImageUrl(url: string | undefined | null): string {
    if (!url) return '/no-image.svg';
    if (url.startsWith('http')) return url;
    return `${environment.strapiUrl}${url}`;
  }
}
