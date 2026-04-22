import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { StrapiResponse, News } from '@models/strapi.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.strapiApiUrl}/news-articles`;

  getAll(): Observable<StrapiResponse<News>> {
    const params = new HttpParams()
      .set('sort', 'date:desc')
      .set('populate', '*');

    return this.http.get<StrapiResponse<News>>(this.apiUrl, { params });
  }
}
