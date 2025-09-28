// storysell-shopify-app/src/contexts/BillingContext/BillingContext.ts
import { createContext } from "react";
import { BillingPlan } from "../../types/billing.types";

export type BillingContextType = {
  plans: BillingPlan[];
  currentPlan?: BillingPlan;
  subscribe: (planId: string) => Promise<void>;
};

// Criamos apenas o contexto aqui
export const BillingContext = createContext<BillingContextType | undefined>(undefined);
