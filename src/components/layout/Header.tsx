// src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/auth/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>StorySell</div>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/dashboard">Dashboard</Link>

        {user ? (
          <>
            <span className={styles.user}>Olá, {user.fullName}</span>
            <button className={styles.logoutBtn} onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
          </>
        )}
      </nav>
    </header>
  );
};
