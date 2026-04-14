import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { StrapiSingleResponse, Home } from '@models/strapi.model';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.strapiApiUrl}/home`;

  get(): Observable<StrapiSingleResponse<Home>> {
    const params = new HttpParams().set('populate', '*');
    return this.http.get<StrapiSingleResponse<Home>>(this.apiUrl, { params });
  }

  getImageUrl(url: string | undefined | null): string {
    if (!url) return '/no-image.svg';
    if (url.startsWith('http')) return url;
    return `${environment.strapiUrl}${url}`;
  }
}
