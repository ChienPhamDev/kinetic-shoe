export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  thumbnails: string[];
  isNew?: boolean;
  isLimited?: boolean;
  colors: string[];
  sizes: string[];
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
