import React, { useState, useEffect } from 'react';
import { ProductContext, ProductContextType } from './ProductContext';
import { getProducts } from '../../api/product.api';
import { Product } from '../../types/product.types';

type Props = { children: React.ReactNode };

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const contextValue: ProductContextType = { products, fetchProducts };

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
};
