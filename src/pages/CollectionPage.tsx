import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CollectionCarousel } from '../components/stories/CollectionCarousel';
import styles from './CollectionPage.module.css';

export const CollectionPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>Collections</h1>
        <CollectionCarousel />
      </main>
      <Footer />
    </div>
  );
};
