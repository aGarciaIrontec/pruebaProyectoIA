import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { StrapiResponse, Testimonial } from '@models/strapi.model';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.strapiApiUrl}/testimonials`;

  getAll(): Observable<StrapiResponse<Testimonial>> {
    const params = new HttpParams()
      .set('sort', 'createdAt:desc');

    return this.http.get<StrapiResponse<Testimonial>>(this.apiUrl, { params });
  }
}
