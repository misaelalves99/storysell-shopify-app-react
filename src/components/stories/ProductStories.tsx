// storysell-shopify-app/src/components/stories/ProductStories.tsx
import React, { useEffect, useState } from "react";
import { Product } from "../../types/product.types";
import * as fakeApi from "../../lib/fakeApi/fakeProductApi";
import { useBilling } from "../../hooks/useBilling";
import styles from "./ProductStories.module.css";

export const ProductStories: React.FC = () => {
  const { currentPlan } = useBilling();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fakeApi.getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // 🔹 Bloqueia se plano for "free"
  if (!currentPlan || currentPlan.id === "free") return null;

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <section className={styles.container}>
      <h2>Product Stories</h2>

      <div className={styles.scrollWrapper}>
        {products.slice(0, 8).map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={p.images[0]} alt={p.title} className={styles.productImage} />
              <div className={styles.overlay}>
                <p className={styles.price}>${p.price.toFixed(2)}</p>
                <button className={styles.cta}>View</button>
              </div>
            </div>
            <h3>{p.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
