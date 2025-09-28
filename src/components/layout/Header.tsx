// src/components/layout/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/auth/AuthContext';
import { FaUserCircle } from 'react-icons/fa'; // Ícone de perfil

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu(prev => !prev);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>StorySell</div>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/dashboard">Dashboard</Link>

        {/* Ícone de Perfil */}
        <div className={styles.profileWrapper}>
          <FaUserCircle
            className={styles.profileIcon}
            size={28}
            onClick={toggleMenu}
          />
          {openMenu && (
            <div className={styles.profileMenu}>
              {user ? (
                <>
                  <span>Olá, {user.fullName}</span>
                  <button onClick={logout} className={styles.logoutBtn}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpenMenu(false)}>Login</Link>
                  <Link to="/register" onClick={() => setOpenMenu(false)}>Registrar</Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
