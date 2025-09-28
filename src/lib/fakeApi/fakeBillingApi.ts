// storysell-shopify-app/src/lib/fakeApi/fakeBillingApi.ts
import { BillingPlan } from "../../types/billing.types";
import { getLoggedUser } from "../../api/auth.api";

const plans: BillingPlan[] = [
  {
    id: "free",
    name: "Plano Gratuito",
    price: 0,
    interval: "monthly",
    features: ["Testar o app", "Funcionalidades limitadas"],
  },
  {
    id: "intermediate",
    name: "Plano Intermediário",
    price: 49.9,
    interval: "monthly",
    features: ["Stories na página do produto"],
  },
  {
    id: "complete",
    name: "Plano Completo",
    price: 99.9,
    interval: "monthly",
    features: ["Stories na Home", "Stories no produto", "Carrossel de coleções"],
  },
];

const PLAN_STORAGE_KEY = "user_plans";

/**
 * Retorna todos os planos disponíveis
 */
export const getBillingPlans = async (): Promise<BillingPlan[]> => {
  await new Promise((res) => setTimeout(res, 200));
  return plans;
};

/**
 * Assina um plano para o usuário logado
 */
export const subscribeToPlan = async (planId: string): Promise<{ success: boolean; planId: string }> => {
  await new Promise((res) => setTimeout(res, 300));
  const user = getLoggedUser();
  if (!user) throw new Error("Usuário não logado");

  const stored = localStorage.getItem(PLAN_STORAGE_KEY);
  const userPlans = stored ? JSON.parse(stored) : {};

  userPlans[user.email] = planId;
  localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(userPlans));

  return { success: true, planId };
};

/**
 * Retorna o plano do usuário logado
 */
export const getCurrentPlan = async (): Promise<BillingPlan | null> => {
  await new Promise((res) => setTimeout(res, 200));
  const user = getLoggedUser();
  if (!user) return null;

  const stored = localStorage.getItem(PLAN_STORAGE_KEY);
  const userPlans = stored ? JSON.parse(stored) : {};

  const planId = userPlans[user.email];
  if (!planId) return null;

  return plans.find((p) => p.id === planId) || null;
};
