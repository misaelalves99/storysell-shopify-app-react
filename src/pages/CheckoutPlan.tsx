// storysell-shopify-app/src/pages/CheckoutPlan.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckoutForm } from "../components/checkout/CheckoutForm";
import { PlanSummary } from "../components/checkout/PlanSummary";
import styles from "./CheckoutPlan.module.css";

export const CheckoutPlan: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();

  if (!planId) return <p>Plano não encontrado</p>;

  return (
    <div className={styles.checkoutContainer}>
      <h1>Finalizar Assinatura</h1>
      <div className={styles.checkoutContent}>
        <div className={styles.formWrapper}>
          <CheckoutForm planId={planId} onSuccess={() => navigate("/")} />
        </div>
        <div className={styles.summaryWrapper}>
          <PlanSummary planId={planId} />
        </div>
      </div>
    </div>
  );
};
