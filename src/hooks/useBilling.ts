// storysell-shopify-app/src/hooks/useBilling.ts
import { useState, useEffect } from "react";

export type Plan = "free" | "intermediate" | "complete";

export const useBilling = () => {
  const [currentPlan, setCurrentPlan] = useState<{ id: Plan }>({ id: "free" });

  // Simulação de fetch do plano ativo
  useEffect(() => {
    // Aqui poderia buscar o plano do lojista via API
    const storedPlan = localStorage.getItem("shopPlan") as Plan;
    if (storedPlan) setCurrentPlan({ id: storedPlan });
  }, []);

  const subscribeToPlan = async (plan: Plan) => {
    // Simula processamento de pagamento
    await new Promise((res) => setTimeout(res, 1500));
    localStorage.setItem("shopPlan", plan);
    setCurrentPlan({ id: plan });
  };

  return { currentPlan, subscribeToPlan };
};
