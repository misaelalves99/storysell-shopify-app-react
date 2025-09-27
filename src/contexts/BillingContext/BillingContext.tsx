// src/contexts/BillingContext/BillingContext.tsx
import { createContext } from "react";
import { BillingPlan } from "../../types/billing.types";

export type BillingContextType = {
  plans: BillingPlan[];
  currentPlan?: BillingPlan; // ✅ adicionamos aqui
  subscribe?: (planId: string) => Promise<void>; // opcional, se você quiser implementar assinatura
};

export const BillingContext = createContext<BillingContextType | undefined>(undefined);
