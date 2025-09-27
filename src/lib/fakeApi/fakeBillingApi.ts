// src/lib/fakeApi/fakeBillingApi.ts

import { BillingPlan } from "../../types/billing.types";

const fakePlans: BillingPlan[] = [
  { id: "free", name: "Free Trial", price: 0, interval: "monthly", features: [] },
  { id: "intermediate", name: "Intermediate Plan", price: 29.99, interval: "monthly", features: ["Product Stories"] },
  { id: "complete", name: "Complete Plan", price: 59.99, interval: "monthly", features: ["Home Stories", "Product Stories", "Collection Carousel"] },
];

// Retorna todos os planos
export const getBillingPlans = async (): Promise<BillingPlan[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(fakePlans), 300));
};

// Retorna o plano atual (simulação)
export const getCurrentPlan = async (): Promise<BillingPlan> => {
  return new Promise((resolve) => setTimeout(() => resolve(fakePlans[2]), 300)); // exemplo: completo
};

// Função de subscrição → precisa ser exportada
export const subscribeToPlan = async (planId: string): Promise<{ success: boolean }> => {
  console.log("Subscribed to plan:", planId);
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 300));
};
