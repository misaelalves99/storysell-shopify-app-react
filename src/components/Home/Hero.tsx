// storysell-shopify-app/src/components/Home/Hero.tsx
import React from "react";
import styles from "./Hero.module.css";

interface Props {
  onOpenPlans: () => void;
}

export const Hero: React.FC<Props> = ({ onOpenPlans }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Impulsione sua loja Shopify com Stories & Reels</h1>
        <p>
          Aumente o engajamento e as vendas adicionando vídeos de stories nas páginas de produtos,
          destaques na página inicial e carrosséis de coleções.
        </p>
        <button className={styles.openPlansBtn} onClick={onOpenPlans}>
          Ver Planos
        </button>
      </div>
    </section>
  );
};
