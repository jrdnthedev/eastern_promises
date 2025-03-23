import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Invoice, Revenue } from '../types/types';
import { CustomerServiceService } from '../services/customer-service/customer-service.service';

export function convertIdToName(
  invoices$: Observable<Invoice[]>,
  customerService: CustomerServiceService
): Observable<Revenue[]> {
  return invoices$.pipe(
    switchMap((invoices: Invoice[]) =>
      forkJoin(
        invoices.map((item: Invoice) =>
          customerService.getCustomerById(item.customer_id).pipe(
            map((customer) => ({
              ...item,
              customer_name: customer.name,
            }))
          )
        )
      )
    ),
    map((invoicesWithNames: Invoice[]) =>
      invoicesWithNames.reduce((acc: any, item: any) => {
        if (!acc[item.customer_id]) {
          acc[item.customer_id] = {
            name: item.customer_name,
            series: [],
          };
        }
        acc[item.customer_id].series.push({
          name: item.date.split('-')[0],
          value: item.amount,
          extra: { code: item.customer_id },
        });
        return acc;
      }, {} as Record<string, Revenue>)
    ),
    map((groupedItems) => Object.values(groupedItems))
  );
}
