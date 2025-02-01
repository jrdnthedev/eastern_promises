import {
  Component,
  ComponentRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { Invoice } from '../../types/types';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { AddInvoiceModalComponent } from '../../components/add-invoice-modal/add-invoice-modal.component';
import { EditInvoiceModalComponent } from '../../components/edit-invoice-modal/edit-invoice-modal.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, TableComponent, PaginationComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {
  private invoiceService = inject(InvoiceService);
  invoices$ = this.invoiceService.invoice$;
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
  paginatedItems: Invoice[] = [];

  ngOnInit() {
    this.invoiceService.getInvoices();
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
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.invoices$.subscribe((item) => {
      this.totalItems = item.length;
      this.paginatedItems = item.slice(startIndex, endIndex);
    });
  }

  closeModal() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
