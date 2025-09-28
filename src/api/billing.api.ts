// storysell-shopify-app/src/api/billing.api.ts
import { BillingPlan } from "../types/billing.types";
import * as fakeApi from "../lib/fakeApi/fakeBillingApi";

const API_URL = import.meta.env.VITE_API_URL;

// Se rodar em development → usa fake API
const useFakeApi = import.meta.env.MODE === "development";

/**
 * Get all billing plans
 */
export const getBillingPlans = async (): Promise<BillingPlan[]> => {
  if (useFakeApi) {
    return fakeApi.getBillingPlans();
  }

  const response = await fetch(`${API_URL}/billing/plans`);
  if (!response.ok) throw new Error("Failed to fetch billing plans");
  return response.json();
};

/**
 * Subscribe to a plan
 */
export const subscribeToPlan = async (
  planId: string
): Promise<{ success: boolean; planId: string }> => {
  if (useFakeApi) {
    return fakeApi.subscribeToPlan(planId);
  }

  const response = await fetch(`${API_URL}/billing/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId }),
  });
  if (!response.ok) throw new Error("Failed to subscribe to plan");
  return response.json();
};

/**
 * Get current subscribed plan
 */
export const getCurrentPlan = async (): Promise<BillingPlan | null> => {
  if (useFakeApi) {
    return fakeApi.getCurrentPlan();
  }

  const response = await fetch(`${API_URL}/billing/current-plan`);
  if (!response.ok) throw new Error("Failed to fetch current plan");
  return response.json();
};
