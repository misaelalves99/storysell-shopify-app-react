import React from 'react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>StorySell</div>
      <nav className={styles.nav}>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/collections">Collections</a>
        <a href="/dashboard">Dashboard</a>
      </nav>
    </header>
  );
};