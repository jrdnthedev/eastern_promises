export type Customer = {
  id: string;
  name: string;
  email: string;
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
