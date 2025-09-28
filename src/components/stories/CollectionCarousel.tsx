import React, { useState } from "react";
import { CollectionCard } from "./CollectionCard";
import styles from "./CollectionCarousel.module.css";
import { CollectionType } from "../../types/product.types";

interface Props {
  collections: CollectionType[];
}

export const CollectionCarousel: React.FC<Props> = ({ collections }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (collections.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  };

  const currentCollection = collections[currentIndex];

  return (
    <section className={styles.carouselWrapper}>
      <button className={styles.navButton} onClick={handlePrev}>&lt;</button>

      <div className={styles.carousel}>
        <CollectionCard collection={currentCollection} />
      </div>

      <button className={styles.navButton} onClick={handleNext}>&gt;</button>
    </section>
  );
};
