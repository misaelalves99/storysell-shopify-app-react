// storysell-shopify-app/src/components/Home/PlanCards.tsx
import React from "react";
import styles from "./PlanCards.module.css";

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface Props {
  plans: Plan[];
  onSubscribe: (planId: string) => void;
}

export const PlanCards: React.FC<Props> = ({ plans, onSubscribe }) => {
  return (
    <section className={styles.plansSection}>
      <h2>Escolha seu plano</h2>
      <div className={styles.plansGrid}>
        {plans.map(plan => (
          <div key={plan.id} className={styles.planCard}>
            <h3>{plan.name}</h3>
            <p className={styles.price}>{plan.price}</p>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button className={styles.subscribeBtn} onClick={() => onSubscribe(plan.id)}>
              Assinar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
