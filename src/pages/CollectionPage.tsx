// src/pages/CollectionPage.tsx
import React, { useEffect, useState } from "react";
import * as fakeApi from "../lib/fakeApi/fakeCollectionApi";
import { useBilling } from "../hooks/useBilling";
import { CollectionCarousel } from "../components/stories/CollectionCarousel";
import { CollectionType } from "../types/product.types";
import { Highlights } from "../components/stories/Highlights";
import styles from "./CollectionPage.module.css";

export const CollectionPage: React.FC = () => {
  const { currentPlan } = useBilling();
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!currentPlan || currentPlan.id !== "complete") return null;
  if (loading) return <div className={styles.loader}>Carregando coleções...</div>;
  if (collections.length === 0) return <p>Nenhuma coleção disponível.</p>;

  return (
    <div className={styles.pageContainer}>
      {/* Carousel com container degradê */}
      <div className={styles.carouselContainer}>
        <CollectionCarousel collections={collections} />
      </div>

      {/* Highlights com container elegante */}
      <div className={styles.highlightsContainer}>
        <Highlights collections={collections} />
      </div>
    </div>
  );
};
