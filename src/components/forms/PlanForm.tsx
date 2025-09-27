import React, { useState } from 'react';
import { useBilling } from '../../hooks/useBilling';
import styles from './PlanForm.module.css';

export const PlanForm: React.FC = () => {
  const { plans, fetchPlans } = useBilling();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return alert('Select a plan');
    alert('Subscribed to plan ' + selectedPlan);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Select a Plan</h2>
      <div className={styles.options}>
        {plans.map((plan) => (
          <label key={plan.id} className={styles.option}>
            <input
              type="radio"
              name="plan"
              value={plan.id}
              checked={selectedPlan === plan.id}
              onChange={() => setSelectedPlan(plan.id)}
            />
            {plan.name} - ${plan.price}/{plan.interval}
          </label>
        ))}
      </div>
      <button type="submit" className={styles.submit}>Subscribe</button>
    </form>
  );
};