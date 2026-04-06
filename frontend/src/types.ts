export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
}

export interface Color {
  id: string;
  name: string;
  hex_code: string;
}

export interface Size {
  id: string;
  region: string;
  value: number;
  display_label: string;
}

export interface ProductVariant {
  id: string;
  color: Color;
  size: Size;
  sku: string;
  price: number;
  compare_at_price?: number;
  stock_quantity: number;
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category | string;
  description: string;
  gender: string;
  variants: ProductVariant[];
  images?: { url: string; is_primary: boolean }[];
  created_at: string;
  // UI helpers
  image?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  title: string;
  content: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  createdAt: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled";
  total: number;
  items: CartItem[];
}
