export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  is_active: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  created_at: string;
  updated_at: string;
}
