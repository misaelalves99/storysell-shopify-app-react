// storysell-shopify-app/src/components/Home/FeaturesHighlight.tsx
import React from "react";
import styles from "./FeaturesHighlight.module.css";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface Props {
  features: Feature[];
}

export const FeaturesHighlight: React.FC<Props> = ({ features }) => {
  return (
    <section className={styles.featuresSection}>
      <h2>Destaques do App</h2>
      <div className={styles.grid}>
        {features.map(f => (
          <div key={f.id} className={styles.card}>
            {f.icon && <img src={f.icon} alt={f.title} className={styles.icon} />}
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
