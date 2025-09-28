// src/pages/CollectionPage.tsx
import React from "react";
import { CollectionCarousel } from "../components/stories/CollectionCarousel";
import styles from "./CollectionPage.module.css";

export const CollectionPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Collections</h1>
      <CollectionCarousel />
    </div>
  );
};
