// src/components/layout/Layout.tsx
import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import styles from "./Layout.module.css";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
