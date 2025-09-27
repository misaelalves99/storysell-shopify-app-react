import React, { useState, useEffect } from "react";
import { BillingPlan } from "../../types/billing.types";
import { getBillingPlans, subscribeToPlan } from "../../api/billing.api";
import { BillingContext, BillingContextType } from "./BillingContext";

type Props = { children: React.ReactNode };

export const BillingProvider: React.FC<Props> = ({ children }) => {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<BillingPlan>();

  const fetchPlans = async () => {
    const data = await getBillingPlans();
    setPlans(data);
    setCurrentPlan(data[0]); // plano default: gratuito
  };

  const subscribe = async (planId: string) => {
    await subscribeToPlan(planId);
    const plan = plans.find((p) => p.id === planId);
    if (plan) setCurrentPlan(plan);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const contextValue: BillingContextType = { plans, currentPlan, subscribe };

  return <BillingContext.Provider value={contextValue}>{children}</BillingContext.Provider>;
};
