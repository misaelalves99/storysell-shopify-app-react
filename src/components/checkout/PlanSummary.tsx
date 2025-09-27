// storysell-shopify-app/src/components/checkout/PlanSummary.tsx
import React from "react";
import styles from "../../pages/CheckoutPlan.module.css";

type Props = {
  planId: string;
};

const planInfo = {
  free: { name: "Free Plan", price: "R$0 / 1 mês", description: "Teste gratuito do app por 1 mês" },
  intermediate: { name: "Intermediate Plan", price: "R$49,90 / mês", description: "Desbloqueia stories na página do produto" },
  complete: { name: "Complete Plan", price: "R$99,90 / mês", description: "Desbloqueia todas as funcionalidades" },
};

export const PlanSummary: React.FC<Props> = ({ planId }) => {
  const plan = planInfo[planId as keyof typeof planInfo];
  if (!plan) return null;

  return (
    <div className={styles.summary}>
      <h3>Resumo do Plano</h3>
      <p>Plano: <strong>{plan.name}</strong></p>
      <p>Preço: {plan.price}</p>
      <p>{plan.description}</p>
    </div>
  );
};
