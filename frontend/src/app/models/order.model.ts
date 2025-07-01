export interface Order {
  id: number;
  total_amount: number;
  status: string;
  shipping_address: any;
  payment_method: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  total: number;
  product: {
    id: number;
    name: string;
    image_url: string;
  };
}
