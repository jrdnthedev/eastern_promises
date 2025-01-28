export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  image_url: string;
};

export type Invoice = {
  status: string;
  customer_id: number;
  date: string;
  amount: number;
};

export type Revenue = {
  month: string;
  revenue: number;
};
