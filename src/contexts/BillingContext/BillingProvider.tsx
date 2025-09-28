// storysell-shopify-app/src/contexts/BillingContext/BillingProvider.tsx
import React, { useState, useEffect } from "react";
import { BillingPlan } from "../../types/billing.types";
import { getBillingPlans, subscribeToPlan } from "../../api/billing.api";
import { BillingContext, BillingContextType } from "./BillingContext";

type Props = { children: React.ReactNode };

export const BillingProvider: React.FC<Props> = ({ children }) => {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<BillingPlan>();

  // 🔹 Busca os planos (fake ou real API)
  const fetchPlans = async () => {
    const data = await getBillingPlans();
    setPlans(data);

    // Tenta restaurar plano salvo no localStorage
    const storedPlan = localStorage.getItem("shopPlan");
    if (storedPlan) {
      const plan = data.find((p) => p.id === storedPlan);
      if (plan) {
        setCurrentPlan(plan);
        return;
      }
    }

    // Se não houver plano salvo → default: primeiro plano (free)
    setCurrentPlan(data[0]);
  };

  // 🔹 Assina um plano
  const subscribe = async (planId: string) => {
    await subscribeToPlan(planId);
    const plan = plans.find((p) => p.id === planId);
    if (plan) {
      setCurrentPlan(plan);
      localStorage.setItem("shopPlan", plan.id);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const value: BillingContextType = {
    plans,
    currentPlan,
    subscribe,
  };

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
};
