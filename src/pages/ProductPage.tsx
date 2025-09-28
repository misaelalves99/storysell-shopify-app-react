// src/pages/ProductPage.tsx
import React from "react";
import { ProductGrid } from "../components/products/ProductGrid";

import styles from "./ProductPage.module.css";

export const ProductPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>
      <ProductGrid />
    </div>
  );
};
