import {
  Component,
  ComponentRef,
  inject,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Invoice } from '../../types/types';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { AddInvoiceModalComponent } from './components/add-invoice-modal/add-invoice-modal.component';
import { EditInvoiceModalComponent } from './components/edit-invoice-modal/edit-invoice-modal.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-invoices',
  imports: [CommonModule, TableComponent, PaginationComponent],
  standalone: true,
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {
  private store = inject(Store);
  invoices$ = this.store.select('invoices');
  @ViewChild('dynamicEditModalContainer', {
    read: ViewContainerRef,
    static: true,
  })
  editModalContainer!: ViewContainerRef;

  @ViewChild('dynamicAddInvoiceModalContainer', {
    read: ViewContainerRef,
    static: true,
  })
  addInvoiceModalContainer!: ViewContainerRef;
  componentRef?: ComponentRef<EditInvoiceModalComponent>;
  addcomponentRef?: ComponentRef<AddInvoiceModalComponent>;

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  private paginatedItemsSubject = new BehaviorSubject<Invoice[]>([]);
  paginatedItems$ = this.paginatedItemsSubject.asObservable();
  isAsc = signal(true);
  ngOnInit() {
    this.updatePaginatedItems();
  }

  editInvoice(invoice: Invoice) {
    this.editModalContainer.clear();
    this.componentRef = this.editModalContainer.createComponent(
      EditInvoiceModalComponent
    );
    this.componentRef.instance.invoice = invoice;
    this.componentRef.instance.destroy.subscribe(() => {
      this.editModalContainer.clear();
      this.closeModal();
    });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  updatePaginatedItems() {
    this.invoices$
      .pipe(
        catchError((error) => error),
        map((items) => {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          this.totalItems = items.length;
          return items.slice(startIndex, endIndex);
        })
      )
      .subscribe((paginatedItems) => {
        this.paginatedItemsSubject.next(paginatedItems);
      });
  }
  createInvoice() {
    this.addInvoiceModalContainer.clear();
    this.addcomponentRef = this.addInvoiceModalContainer.createComponent(
      AddInvoiceModalComponent
    );
    this.invoices$.subscribe((item) => {
      this.addcomponentRef
        ? (this.addcomponentRef.instance.invoices = item)
        : null;
    });
    this.addcomponentRef.instance.destroy.subscribe(() => {
      this.addInvoiceModalContainer.clear();
      this.closeModal();
    });
  }
  deleteInvoice(id: string) {
    this.store.dispatch({ type: '[Invoices] Delete Invoice', id: id });
    this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePaginatedItems();
  }

  sort(value: string) {
    this.isAsc.update((val) => !val);
    const sortedItems = [...this.paginatedItemsSubject.getValue()].sort(
      (a: any, b: any) => {
        const direction = this.isAsc() ? 1 : -1;
        return a[value] > b[value] ? direction : -direction;
      }
    );
    this.paginatedItemsSubject.next(sortedItems);
  }
  closeModal() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
