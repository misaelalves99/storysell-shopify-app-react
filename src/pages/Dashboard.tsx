// src/pages/Dashboard.tsx

import React from "react";
import styles from "./Dashboard.module.css";

export const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Dashboard</h2>
        <nav>
          <ul>
            <li><a href="/dashboard">Overview</a></li>
            <li><a href="/dashboard/products">Products</a></li>
            <li><a href="/dashboard/collections">Collections</a></li>
            <li><a href="/dashboard/settings">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.content}>
        <header className={styles.header}>
          <h1>Welcome to your Dashboard 👋</h1>
          <p>Manage products, collections and settings here.</p>
        </header>

        <section className={styles.cards}>
          <div className={styles.card}>
            <h3>Products</h3>
            <p>Manage and add new products.</p>
          </div>
          <div className={styles.card}>
            <h3>Collections</h3>
            <p>Organize products into collections.</p>
          </div>
          <div className={styles.card}>
            <h3>Settings</h3>
            <p>Configure store preferences.</p>
          </div>
        </section>
      </main>
    </div>
  );
};
