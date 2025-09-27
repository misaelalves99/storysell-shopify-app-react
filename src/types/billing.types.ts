// storysell-shopify-app/src/types/billing.types.ts

export type BillingPlanId = "free" | "intermediate" | "complete";

export interface BillingPlan {
  id: BillingPlanId;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
}

export type Subscription = {
  id: string;
  planId: string;
  userId: string;
  startDate: string;
  endDate: string;
};
