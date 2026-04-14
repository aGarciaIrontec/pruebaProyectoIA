import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { StrapiResponse, Video } from '@models/strapi.model';

@Injectable({ providedIn: 'root' })
export class VideoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.strapiApiUrl}/videos`;

  getAll(): Observable<StrapiResponse<Video>> {
    const params = new HttpParams().set('populate', '*');
    return this.http.get<StrapiResponse<Video>>(this.apiUrl, { params });
  }
}
