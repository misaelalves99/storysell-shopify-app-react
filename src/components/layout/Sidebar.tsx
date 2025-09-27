import React from 'react';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/dashboard/products">Products</a></li>
        <li><a href="/dashboard/collections">Collections</a></li>
        <li><a href="/dashboard/billing">Billing</a></li>
      </ul>
    </aside>
  );
};
