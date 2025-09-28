// storysell-shopify-app/src/components/stories/CollectionCard.tsx
import React from "react";
import { CollectionType } from "./CollectionCarousel";
import { ProductCard } from "./ProductCard";
import styles from "./CollectionCard.module.css";

interface Props {
  collection: CollectionType;
}

export const CollectionCard: React.FC<Props> = ({ collection }) => {
  return (
    <div className={styles.collectionCard}>
      <h3>{collection.name}</h3>
      <div className={styles.products}>
        {collection.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
