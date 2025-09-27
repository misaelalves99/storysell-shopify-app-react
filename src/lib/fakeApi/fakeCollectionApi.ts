// storysell-shopify-app/src/lib/fakeApi/fakeCollectionApi.ts
import { Product } from "../../types/product.types";
import * as fakeProductApi from "./fakeProductApi";

const fakeCollections = [
  {
    id: "c1",
    name: "Summer Collection",
    products: [fakeProductApi.getProducts().then(p => p[0]), fakeProductApi.getProducts().then(p => p[2])]
  },
  {
    id: "c2",
    name: "Winter Collection",
    products: [fakeProductApi.getProducts().then(p => p[1])]
  },
  {
    id: "c3",
    name: "Accessories",
    products: [fakeProductApi.getProducts().then(p => p[3]), fakeProductApi.getProducts().then(p => p[4])]
  },
];

export const getCollections = async (): Promise<{
  id: string;
  name: string;
  products: Product[];
}[]> => {
  const productsResolved = await Promise.all(fakeCollections.map(async c => {
    const resolvedProducts = await Promise.all(c.products);
    return { ...c, products: resolvedProducts };
  }));
  return new Promise((resolve) => setTimeout(() => resolve(productsResolved), 500));
};

export const getCollectionById = async (
  id: string
): Promise<{ id: string; name: string; products: Product[] }> => {
  const allCollections = await getCollections();
  const collection = allCollections.find((c) => c.id === id);
  if (!collection) throw new Error("Collection not found");
  return collection;
};
