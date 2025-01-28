import { Component, inject } from '@angular/core';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';
import { Customer } from '../../types/types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private customerService = inject(CustomerServiceService);
  customers: Customer[] = [];

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      console.log(data);
      this.customers = data;
    });
  }
}
