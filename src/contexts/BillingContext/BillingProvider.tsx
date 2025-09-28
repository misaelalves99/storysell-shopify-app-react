import React, { useState, useEffect } from "react";
import { BillingPlan } from "../../types/billing.types";
import { getBillingPlans, getCurrentPlan as getStoredPlan, subscribeToPlan } from "../../lib/fakeApi/fakeBillingApi";
import { BillingContext, BillingContextType } from "./BillingContext";
import { useAuth } from "../auth/AuthContext";

type Props = { children: React.ReactNode };

export const BillingProvider: React.FC<Props> = ({ children }) => {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<BillingPlan | undefined>(undefined);
  const { user } = useAuth();

  // Busca todos os planos disponíveis
  const fetchPlans = async () => {
    const data = await getBillingPlans();
    setPlans(data);
  };

  // Busca o plano atual do usuário logado
  const fetchCurrentPlan = async () => {
    if (!user) {
      setCurrentPlan(undefined);
      return;
    }
    const plan = await getStoredPlan();
    setCurrentPlan(plan || undefined);
  };

  // Subscrição a um plano
  const subscribe = async (planId: string) => {
    if (!user) throw new Error("Usuário não logado");

    await subscribeToPlan(planId);
    // Atualiza imediatamente o currentPlan
    const plan = plans.find((p) => p.id === planId);
    setCurrentPlan(plan);
  };

  // Atualiza planos disponíveis
  useEffect(() => {
    fetchPlans();
  }, []);

  // Atualiza plano atual sempre que o usuário muda
  useEffect(() => {
    fetchCurrentPlan();
  }, [user]);

  const value: BillingContextType = {
    plans,
    currentPlan,
    subscribe,
  };

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
};
