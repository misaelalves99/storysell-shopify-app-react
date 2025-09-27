// storysell-shopify-app/src/api/collection.api.ts
import { Product } from "../types/product.types";
import * as fakeApi from "../lib/fakeApi/fakeCollectionApi";

const API_URL = import.meta.env.VITE_API_URL;

// Se rodar em development → usa fake API
const useFakeApi = import.meta.env.MODE === "development";

/**
 * Get all collections
 */
export const getCollections = async (): Promise<
  { id: string; name: string; products: Product[] }[]
> => {
  if (useFakeApi) {
    return fakeApi.getCollections();
  }

  const response = await fetch(`${API_URL}/collections`);
  if (!response.ok) throw new Error("Failed to fetch collections");
  return response.json();
};

/**
 * Get a single collection by ID
 */
export const getCollectionById = async (
  id: string
): Promise<{ id: string; name: string; products: Product[] }> => {
  if (useFakeApi) {
    return fakeApi.getCollectionById(id);
  }

  const response = await fetch(`${API_URL}/collections/${id}`);
  if (!response.ok) throw new Error("Failed to fetch collection");
  return response.json();
};
