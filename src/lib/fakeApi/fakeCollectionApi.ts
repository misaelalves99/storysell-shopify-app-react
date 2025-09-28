// storysell-shopify-app/src/lib/fakeApi/fakeCollectionApi.ts
import * as fakeProductApi from "./fakeProductApi";
import { Product } from "../../types/product.types";

const fakeCollections = [
  {
    id: "c1",
    name: "Summer Collection",
    products: [fakeProductApi.getProducts().then(p => p[0]), fakeProductApi.getProducts().then(p => p[2])]
  },
  {
    id: "c2",
    name: "Winter Collection",
    products: [fakeProductApi.getProducts().then(p => p[1]), fakeProductApi.getProducts().then(p => p[5])]
  },
  {
    id: "c3",
    name: "Accessories",
    products: [fakeProductApi.getProducts().then(p => p[3]), fakeProductApi.getProducts().then(p => p[4])]
  },
  {
    id: "c4",
    name: "Footwear",
    products: [fakeProductApi.getProducts().then(p => p[6]), fakeProductApi.getProducts().then(p => p[7])]
  },
  {
    id: "c5",
    name: "T-Shirts",
    products: [fakeProductApi.getProducts().then(p => p[8]), fakeProductApi.getProducts().then(p => p[9])]
  },
  {
    id: "c6",
    name: "Jackets",
    products: [fakeProductApi.getProducts().then(p => p[10]), fakeProductApi.getProducts().then(p => p[11])]
  },
  {
    id: "c7",
    name: "Bags",
    products: [fakeProductApi.getProducts().then(p => p[12]), fakeProductApi.getProducts().then(p => p[13])]
  },
  {
    id: "c8",
    name: "Hats",
    products: [fakeProductApi.getProducts().then(p => p[14]), fakeProductApi.getProducts().then(p => p[15])]
  },
  {
    id: "c9",
    name: "Watches",
    products: [fakeProductApi.getProducts().then(p => p[16]), fakeProductApi.getProducts().then(p => p[17])]
  },
  {
    id: "c10",
    name: "Special Collection",
    products: [fakeProductApi.getProducts().then(p => p[18]), fakeProductApi.getProducts().then(p => p[19])]
  },
];

export const getCollections = async (): Promise<{ id: string; name: string; products: Product[] }[]> => {
  const resolved = await Promise.all(fakeCollections.map(async (c) => {
    const products = await Promise.all(c.products);
    return { ...c, products };
  }));
  return new Promise((resolve) => setTimeout(() => resolve(resolved), 500));
};

export const getCollectionById = async (id: string): Promise<{ id: string; name: string; products: Product[] }> => {
  const all = await getCollections();
  const found = all.find(c => c.id === id);
  if (!found) throw new Error("Collection not found");
  return found;
};
