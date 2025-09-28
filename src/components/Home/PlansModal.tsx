// storysell-shopify-app/src/components/Home/PlansModal.tsx
import React from "react";
import styles from "./PlansModal.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface Props {
  isOpen: boolean;
  plans: Plan[];
  onClose: () => void;
}

export const PlansModal: React.FC<Props> = ({ isOpen, plans, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubscribe = (planId: string) => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/checkout/${planId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Escolha seu plano</h2>
        <div className={styles.plansGrid}>
          {plans.map((plan) => (
            <div key={plan.id} className={styles.planCard}>
              <h3>{plan.name}</h3>
              <p className={styles.price}>{plan.price}</p>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <button
                className={styles.subscribeBtn}
                onClick={() => handleSubscribe(plan.id)}
              >
                Assinar
              </button>
            </div>
          ))}
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};
