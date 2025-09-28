// storysell-shopify-app/src/components/stories/Highlights.tsx
import React, { useState } from "react";
import { CollectionType } from "../../types/product.types";
import styles from "./Highlights.module.css";

interface Props {
  collections: CollectionType[];
}

export const Highlights: React.FC<Props> = ({ collections }) => {
  const [activeCollectionId, setActiveCollectionId] = useState<string>("all");

  const filteredCollections =
    activeCollectionId === "all"
      ? collections
      : collections.filter((c) => c.id === activeCollectionId);

  return (
    <section className={styles.highlightsContainer}>
      <h2 className={styles.title}>Destaques das Coleções</h2>

      {/* Filtro por coleção */}
      <div className={styles.filterBar}>
        <button
          className={activeCollectionId === "all" ? styles.activeFilter : ""}
          onClick={() => setActiveCollectionId("all")}
        >
          Todas
        </button>
        {collections.map((c) => (
          <button
            key={c.id}
            className={activeCollectionId === c.id ? styles.activeFilter : ""}
            onClick={() => setActiveCollectionId(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Grid de coleções */}
      <div className={styles.highlightsGrid}>
        {filteredCollections.map((collection) => (
          <div key={collection.id} className={styles.collectionCard}>
            <h3 className={styles.collectionTitle}>{collection.name}</h3>
            <div className={styles.products}>
              {collection.products.slice(0, 3).map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.imageWrapper}>
                    <img src={product.images[0]} alt={product.title} />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.productTitle}>{product.title}</p>
                    <p className={styles.price}>R${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
