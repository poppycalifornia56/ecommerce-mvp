export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: Product;
  total: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  count: number;
}
