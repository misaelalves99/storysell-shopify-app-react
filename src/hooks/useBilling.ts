import { useContext } from "react";
import { BillingContext } from "../contexts/BillingContext/BillingContext";

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) throw new Error("useBilling must be used within BillingProvider");
  return context;
};
