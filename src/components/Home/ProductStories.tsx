// storysell-shopify-app/src/components/Home/ProductStories.tsx
import React, { useEffect, useRef } from "react";
import { Product } from "../../types/product.types";
import styles from "./ProductStories.module.css";

interface Props {
  products: Product[];
}

export const ProductStories: React.FC<Props> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // scroll infinito
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    let scrollPos = 0;
    const speed = 0.5;

    const loop = () => {
      if (!container) return;
      scrollPos += speed;
      if (scrollPos >= container.scrollWidth / 2) scrollPos = 0;
      container.scrollLeft = scrollPos;
      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  const loopedProducts = [...products, ...products];

  return (
    <section>
      <h2>Stories de Produtos</h2>
      <div className={styles.scrollWrapper} ref={scrollRef}>
        {loopedProducts.map((p, i) => (
          <div key={`${p.id}-${i}`} className={styles.productCard}>
            <img src={p.images[0]} alt={p.title} />
            <h3>{p.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
