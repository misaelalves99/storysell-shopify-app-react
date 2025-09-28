// storysell-shopify-app/src/components/Home/ProductStories.tsx
import React, { useEffect, useRef, useState } from "react";
import { Product } from "../../types/product.types";
import styles from "./ProductStories.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  products: Product[];
}

export const ProductStories: React.FC<Props> = ({ products }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // loop de slides automático
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // muda a cada 4s
    return () => clearInterval(interval);
  });

  const handleNext = () => {
    if (!containerRef.current) return;
    const itemsPerView = getItemsPerView();
    const totalSlides = Math.ceil(products.length / itemsPerView);
    const nextIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    if (!containerRef.current) return;
    const itemsPerView = getItemsPerView();
    const totalSlides = Math.ceil(products.length / itemsPerView);
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    setCurrentIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const cardWidth = container.offsetWidth / getItemsPerView();
    container.scrollTo({
      left: index * cardWidth * getItemsPerView(),
      behavior: "smooth",
    });
  };

  const getItemsPerView = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 4;
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Stories de Produtos</h2>
      <div className={styles.carouselWrapper}>
        <button className={styles.navButton} onClick={handlePrev}>
          <FiChevronLeft size={28} />
        </button>
        <div className={styles.scrollWrapper} ref={containerRef}>
          {products.map((p, i) => (
            <div key={`${p.id}-${i}`} className={styles.productCard}>
              <img src={p.images[0]} alt={p.title} />
              <h3>{p.title}</h3>
            </div>
          ))}
        </div>
        <button className={styles.navButton} onClick={handleNext}>
          <FiChevronRight size={28} />
        </button>
      </div>
    </section>
  );
};
