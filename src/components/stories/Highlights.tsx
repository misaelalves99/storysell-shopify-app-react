// storysell-shopify-app/src/components/stories/Highlights.tsx
import React from "react";
import { CollectionType } from "./CollectionCarousel";
import styles from "./Highlights.module.css";

interface Props {
  collections: CollectionType[];
}

export const Highlights: React.FC<Props> = ({ collections }) => {
  return (
    <div className={styles.additionalSections}>
      <h3 className={styles.subtitle}>Destaques</h3>
      <div className={styles.highlightsGrid}>
        {collections.map((c) => (
          <div key={c.id} className={styles.highlightSection}>
            <h4>{c.name}</h4>
            <div className={styles.highlightProducts}>
              {c.products.slice(0, 2).map((p) => (
                <div key={p.id} className={styles.highlightCard}>
                  <img src={p.images[0]} alt={p.title} />
                  <div className={styles.highlightInfo}>
                    <p>{p.title}</p>
                    <p className={styles.price}>R${p.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
