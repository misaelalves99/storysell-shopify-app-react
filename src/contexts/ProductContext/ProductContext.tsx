import { createContext } from 'react';
import { Product } from '../../types/product.types';

export type ProductContextType = {
  products: Product[];
  fetchProducts: () => Promise<void>;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
