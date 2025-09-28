// storysell-shopify-app/src/types/product.types.ts

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  collectionId?: string;
  available: boolean;
};

export interface CollectionType {
  id: string;
  name: string;
  products: Product[];
}
