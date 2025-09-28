// storysell-shopify-app/src/components/Home/Testimonials.tsx
import React from "react";
import styles from "./Testimonials.module.css";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  comment: string;
}

interface Props {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<Props> = ({ testimonials }) => {
  return (
    <section className={styles.testimonials}>
      <h2>O que nossos clientes dizem</h2>
      <div className={styles.grid}>
        {testimonials.map(t => (
          <div key={t.id} className={styles.card}>
            <img src={t.avatar} alt={t.name} />
            <h4>{t.name}</h4>
            <p>"{t.comment}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};
