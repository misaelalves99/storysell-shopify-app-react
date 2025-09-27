import { createContext } from 'react';
import { BillingPlan } from '../types/billing.types';

export type BillingStore = {
  plans: BillingPlan[];
  setPlans: (plans: BillingPlan[]) => void;
};

export const billingStore: BillingStore = {
  plans: [],
  setPlans: () => {}
};
