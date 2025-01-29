import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Revenue } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  private http = inject(HttpClient);
  private backendUrl = 'http://localhost:3000';
  private revenueSubject = new BehaviorSubject<Revenue[]>([]);
  revenue$ = this.revenueSubject.asObservable();
  private latestRevenue = new ReplaySubject<Revenue[]>(3);
  latestRevenue$ = this.latestRevenue.asObservable();
  constructor() {}

  getRevenue(): void {
    this.http
      .get<Revenue[]>(`${this.backendUrl}/revenue`)
      .subscribe((revenue: Revenue[]) => {
        this.revenueSubject.next(revenue);
        this.latestRevenue.next(revenue.slice(-3));
      });
  }
}
