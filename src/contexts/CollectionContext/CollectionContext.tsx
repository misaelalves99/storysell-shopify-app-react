import { createContext } from 'react';
import { Product } from '../../types/product.types';

export type CollectionType = {
  id: string;
  name: string;
  products: Product[];
};

export type CollectionContextType = {
  collections: CollectionType[];
  fetchCollections: () => Promise<void>;
};

export const CollectionContext = createContext<CollectionContextType | undefined>(undefined);
