// src/pages/CollectionPage.tsx
import React from "react";
import { CollectionCarousel } from "../components/stories/CollectionCarousel";
import styles from "./CollectionPage.module.css";

export const CollectionPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Coleções</h1>
      <CollectionCarousel />
    </div>
  );
};
