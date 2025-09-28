// storysell-shopify-app/src/components/stories/ProductCard.tsx
import React from "react";
import { Product } from "../../types/product.types";
import styles from "./ProductCard.module.css";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={product.images[0]} alt={product.title} />
      <p>{product.title}</p>
      <p className={styles.price}>R${product.price.toFixed(2)}</p>
    </div>
  );
};
