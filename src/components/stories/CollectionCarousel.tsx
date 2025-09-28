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
      <h2 className={styles.title}>Top Collections</h2>

      {/* Carrossel principal */}
      <div className={styles.carouselWrapper}>
        <button
          className={styles.navButton}
          onClick={handlePrev}
          aria-label="Coleção anterior"
        >
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
                  <p className={styles.price}>R${p.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className={styles.navButton}
          onClick={handleNext}
          aria-label="Próxima coleção"
        >
          &gt;
        </button>
      </div>

      {/* Destaques adicionais */}
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
    </section>
  );
};
