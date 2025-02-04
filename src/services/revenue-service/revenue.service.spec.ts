import { TestBed } from '@angular/core/testing';

import { RevenueService } from './revenue.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { Revenue } from '../../types/types';

describe('RevenueService', () => {
  let service: RevenueService;
  let httpMock: HttpTestingController;
  const backendUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RevenueService],
    });
    service = TestBed.inject(RevenueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch revenue and update observables', () => {
    const mockRevenue: Revenue[] = [
      { month: 'Jan', revenue: 2000 },
      { month: 'Feb', revenue: 1800 },
      { month: 'Mar', revenue: 2200 },
      { month: 'Apr', revenue: 2500 },
    ];

    service.getRevenue();

    const req = httpMock.expectOne(`${backendUrl}/revenue`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRevenue);

    service.revenue$.subscribe((revenue) => {
      expect(revenue).toEqual(mockRevenue);
    });

    service.latestRevenue$.subscribe((latestRevenue) => {
      expect(latestRevenue).toEqual(mockRevenue.slice(-3));
    });
  });
});
