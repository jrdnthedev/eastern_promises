import { Component, inject } from '@angular/core';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { RevenueService } from '../../services/revenue-service/revenue.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardListComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private customerService = inject(CustomerServiceService);
  private revenueService = inject(RevenueService);
  customers$ = this.customerService.latestCustomers$;
  revenue$ = this.revenueService.latestRevenue$;

  ngOnInit() {
    this.customerService.getCustomers();
    this.revenueService.getRevenue();
  }
}
