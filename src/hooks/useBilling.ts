// storysell-shopify-app/src/hooks/useBilling.ts
import { useContext } from "react";
import { BillingContext } from "../contexts/BillingContext/BillingContext";

export const useBilling = () => {
  const context = useContext(BillingContext);

  if (!context) {
    throw new Error("useBilling deve ser usado dentro de <BillingProvider>");
  }

  return context;
};
