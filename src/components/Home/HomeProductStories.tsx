// storysell-shopify-app/src/components/HomeProductStories.tsx
import React, { useEffect, useRef } from "react";
import { Product } from "../../types/product.types";
import styles from "./HomeProductStories.module.css";

interface Props {
  products: Product[];
}

export const HomeProductStories: React.FC<Props> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // duplicamos os produtos no DOM para efeito de loop
    const totalWidth = container.scrollWidth / 2;

    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= totalWidth) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  // duplicação de produtos no render para loop contínuo
  const loopedProducts = [...products, ...products];

  return (
    <section className={styles.container}>
      <h2>Stories de Produtos</h2>
      <div className={styles.scrollWrapper} ref={scrollRef}>
        {loopedProducts.map((product, index) => (
          <div key={`${product.id}-${index}`} className={styles.card}>
            <img src={product.images[0]} alt={product.title} />
            <h3>{product.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
