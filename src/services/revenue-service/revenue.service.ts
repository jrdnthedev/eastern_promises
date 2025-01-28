import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Revenue } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  private http = inject(HttpClient);
  private backendUrl = 'http://localhost:3000';

  constructor() {}

  getRevenue(): Observable<Revenue[]> {
    return this.http.get<Revenue[]>(`${this.backendUrl}/revenue`);
  }
}
