export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  status: InvoiceStatus;
  customer_id: string;
  date: string;
  amount: number;
};

export type Revenue = {
  name: string;
  series: [];
};

export type InvoiceName = {
  name: string;
  value: number;
  extra: { code: string };
};

export type InvoiceStatus = 'paid' | 'pending' | 'draft';
