import axios from "./axios";
import { 
  Product, 
  PaginatedResponse, 
  Brand, 
  Category, 
  Color, 
  Size 
} from "../types";

export const fetchProducts = async (params: any) => {
  const response = await axios.get<PaginatedResponse<Product>>("/products", { params });
  return response.data;
};

export const fetchProductBySlug = async (slug: string) => {
  const response = await axios.get<Product>(`/products/${slug}`);
  return response.data;
};

export const fetchBrands = async () => {
  const response = await axios.get<Brand[]>("/brands");
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get<Category[]>("/categories");
  return response.data;
};

export const fetchColors = async () => {
  const response = await axios.get<Color[]>("/colors");
  return response.data;
};

export const fetchSizes = async () => {
  const response = await axios.get<Size[]>("/sizes");
  return response.data;
};
