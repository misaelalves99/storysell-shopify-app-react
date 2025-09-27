// storysell-shopify-app/src/api/product.api.ts
import { Product } from "../types/product.types";
import * as fakeApi from "../lib/fakeApi/fakeProductApi";

const API_URL = import.meta.env.VITE_API_URL;

// helper para decidir se usa fake ou real
const useFakeApi = import.meta.env.MODE === "development";

/**
 * Get all products
 */
export const getProducts = async (): Promise<Product[]> => {
  if (useFakeApi) {
    return fakeApi.getProducts();
  }

  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

/**
 * Get product by id
 */
export const getProductById = async (id: string): Promise<Product> => {
  if (useFakeApi) {
    return fakeApi.getProductById(id);
  }

  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};
