// storysell-shopify-app/src/components/Home/CollectionsCarousel.tsx
import React from "react";
import { CollectionWithProducts } from "../../pages/Home";
import styles from "./CollectionsCarousel.module.css";

interface Props {
  collections: CollectionWithProducts[];
}

export const CollectionsCarousel: React.FC<Props> = ({ collections }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Reels por Coleção</h2>
      <div className={styles.carousel}>
        {collections.map((col) => (
          <div key={col.id} className={styles.collectionCard}>
            <h3>{col.name}</h3>
            <div className={styles.products}>
              {col.products.slice(0, 3).map((p) => (
                <div key={p.id} className={styles.productCard}>
                  <img src={p.images[0]} alt={p.title} />
                  <p>{p.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
