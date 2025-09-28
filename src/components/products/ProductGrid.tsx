import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/product.types";
import * as fakeApi from "../../lib/fakeApi/fakeProductApi";
import { useBilling } from "../../hooks/useBilling";
import styles from "./ProductGrid.module.css";

export const ProductGrid: React.FC = () => {
  const { currentPlan } = useBilling();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fakeApi.getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (!currentPlan || currentPlan.id === "free") return null;

  if (loading) return <p>Carregando produtos...</p>;
  if (products.length === 0) return <p>Nenhum produto disponível.</p>;

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.card}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={product.images[0]}
                alt={product.title}
                className={styles.productImage}
              />
            </div>
            <div className={styles.info}>
              <h3>{product.title}</h3>
              <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
              <button className={styles.cta}>Ver Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
