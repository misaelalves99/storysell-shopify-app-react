// storysell-shopify-app/src/components/stories/ProductStories.tsx
import React, { useEffect, useState } from "react";
import { Product } from "../../types/product.types";
import * as fakeApi from "../../lib/fakeApi/fakeProductApi";
import styles from "./ProductStories.module.css";

export const ProductStories: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulando plano ativo (para dev)
  const currentPlan = { id: "complete" }; // "free" | "intermediate" | "complete"

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fakeApi.getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (currentPlan.id !== "complete" && currentPlan.id !== "intermediate") return null;
  if (loading) return <p>Loading products...</p>;

  return (
    <section className={styles.container}>
      <h2>Product Stories</h2>
      <div className={styles.products}>
        {products.slice(0, 5).map((p) => (
          <div key={p.id} className={styles.card}>
            <img src={p.images[0]} alt={p.title} className={styles.productImage} />
            <h3>{p.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
