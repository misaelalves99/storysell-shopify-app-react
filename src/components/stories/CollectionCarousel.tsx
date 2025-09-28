// storysell-shopify-app/src/components/stories/CollectionCarousel.tsx
import React, { useEffect, useState } from "react";
import * as fakeApi from "../../lib/fakeApi/fakeCollectionApi";
import { useBilling } from "../../hooks/useBilling";
import { Product } from "../../types/product.types";
import { CollectionCard } from "./CollectionCard";
import { Highlights } from "./Highlights";
import styles from "./CollectionCarousel.module.css";

export type CollectionType = {
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
      try {
        const data = await fakeApi.getCollections();
        setCollections(data);
      } catch (err) {
        console.error("Erro ao carregar coleções:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  // 🔒 Bloqueia se o plano não for "complete"
  if (!currentPlan || currentPlan.id !== "complete") return null;

  if (loading) return <div className={styles.loader}>Carregando coleções...</div>;
  if (collections.length === 0) return <p>Nenhuma coleção disponível.</p>;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  };

  const currentCollection = collections[currentIndex];

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Principais coleções</h2>

      <div className={styles.carouselWrapper}>
        <button className={styles.navButton} onClick={handlePrev}>
          &lt;
        </button>

        <div className={styles.carousel}>
          <CollectionCard collection={currentCollection} />
        </div>

        <button className={styles.navButton} onClick={handleNext}>
          &gt;
        </button>
      </div>

      <Highlights collections={collections} />
    </section>
  );
};
