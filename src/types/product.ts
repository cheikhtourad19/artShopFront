export interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  images: Array<{ url: string; public_id: string; _id: number }>;
  createdAt?: string;
  updatedAt?: string;
  artisan: string;
}
