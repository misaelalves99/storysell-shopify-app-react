// storysell-shopify-app/src/components/stories/CollectionCarousel.tsx
import React, { useEffect, useState } from "react";
import { Product } from "../../types/product.types";
import * as fakeApi from "../../lib/fakeApi/fakeCollectionApi";
import { useBilling } from "../../hooks/useBilling";
import styles from "./CollectionCarousel.module.css";

type CollectionType = {
  id: string;
  name: string;
  products: Product[];
};

export const CollectionCarousel: React.FC = () => {
  const { currentPlan } = useBilling();
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await fakeApi.getCollections();
      setCollections(data);
      setLoading(false);
    };
    fetchCollections();
  }, []);

  // Bloqueia se o plano não for completo
  if (!currentPlan || currentPlan.id !== "complete") return null;

  if (loading) return <p>Loading collections...</p>;
  if (collections.length === 0) return <p>No collections available.</p>;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  };

  const currentCollection = collections[currentIndex];

  return (
    <section className={styles.container}>
      <h2>Top Collections</h2>

      {/* Carrossel */}
      <div className={styles.carouselWrapper}>
        <button className={styles.navButton} onClick={handlePrev}>
          &lt;
        </button>

        <div className={styles.carousel}>
          <div className={styles.collectionCard}>
            <h3>{currentCollection.name}</h3>
            <div className={styles.products}>
              {currentCollection.products.map((p) => (
                <div key={p.id} className={styles.productCard}>
                  <img src={p.images[0]} alt={p.title} />
                  <p>{p.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className={styles.navButton} onClick={handleNext}>
          &gt;
        </button>
      </div>

      {/* Sessões adicionais de destaque */}
      <div className={styles.additionalSections}>
        {collections.map((c) => (
          <div key={c.id} className={styles.highlightSection}>
            <h4>{c.name} Highlights</h4>
            <div className={styles.highlightProducts}>
              {c.products.slice(0, 2).map((p) => (
                <div key={p.id} className={styles.highlightCard}>
                  <img src={p.images[0]} alt={p.title} />
                  <p>{p.title}</p>
                  <p className={styles.price}>${p.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
