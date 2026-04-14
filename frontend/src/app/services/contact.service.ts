import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.strapiApiUrl}/contact`;

  send(data: ContactPayload): Observable<{ ok: boolean; message: string }> {
    return this.http.post<{ ok: boolean; message: string }>(this.apiUrl, data);
  }
}
