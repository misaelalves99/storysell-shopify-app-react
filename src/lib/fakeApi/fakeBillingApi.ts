// storysell-shopify-app/src/lib/fakeApi/fakeBillingApi.ts
import { BillingPlan } from "../../types/billing.types";

let currentPlanId: string | null = "free"; // default

const plans: BillingPlan[] = [
  {
    id: "free",
    name: "Free Plan",
    price: 0,
    interval: "monthly",
    features: ["Testar o app", "Funcionalidades limitadas"],
  },
  {
    id: "intermediate",
    name: "Intermediate Plan",
    price: 49.9,
    interval: "monthly",
    features: ["Stories na página do produto"],
  },
  {
    id: "complete",
    name: "Complete Plan",
    price: 99.9,
    interval: "monthly",
    features: ["Stories na Home", "Stories no produto", "Carrossel de coleções"],
  },
];

/**
 * Retorna todos os planos
 */
export const getBillingPlans = async (): Promise<BillingPlan[]> => {
  await new Promise((res) => setTimeout(res, 500));
  return plans;
};

/**
 * Simula assinatura de plano
 */
export const subscribeToPlan = async (
  planId: string
): Promise<{ success: boolean; planId: string }> => {
  await new Promise((res) => setTimeout(res, 1000));
  currentPlanId = planId;
  return { success: true, planId };
};

/**
 * Retorna o plano atual
 */
export const getCurrentPlan = async (): Promise<BillingPlan | null> => {
  await new Promise((res) => setTimeout(res, 500));
  return currentPlanId
    ? plans.find((p) => p.id === currentPlanId) || null
    : null;
};
