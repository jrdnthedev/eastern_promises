export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  status: InvoiceStatus;
  customer_id: number;
  date: string;
  amount: number;
};

export type Revenue = {
  name: string;
  series: [];
};

export type InvoiceStatus = 'paid' | 'pending' | 'draft';
