import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Revenue } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  private revenueSubject = new BehaviorSubject<Revenue[]>([]);
  revenue$ = this.revenueSubject.asObservable();
  private latestRevenue = new ReplaySubject<Revenue[]>(3);
  latestRevenue$ = this.latestRevenue.asObservable();
  constructor() {}
}
