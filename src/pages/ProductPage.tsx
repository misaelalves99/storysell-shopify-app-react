import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ProductStories } from '../components/stories/ProductStories';
import styles from './ProductPage.module.css';

export const ProductPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>Products</h1>
        <ProductStories />
      </main>
      <Footer />
    </div>
  );
};
