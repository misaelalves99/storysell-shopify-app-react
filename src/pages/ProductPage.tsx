// src/pages/ProductPage.tsx
import React from "react";
import { ProductStories } from "../components/stories/ProductStories";
import styles from "./ProductPage.module.css";

export const ProductPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <ProductStories />
    </div>
  );
};
