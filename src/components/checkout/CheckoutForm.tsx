// storysell-shopify-app/src/components/checkout/CheckoutForm.tsx
import React, { useState } from "react";
import * as billingApi from "../../api/billing.api";
import styles from "../../pages/CheckoutPlan.module.css";

type Props = {
  planId: string;
  onSuccess: () => void;
};

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: "card" | "pix" | "boleto";
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export const CheckoutForm: React.FC<Props> = ({ planId, onSuccess }) => {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // Simula processamento de pagamento
      await new Promise((res) => setTimeout(res, 1500));

      // Fake API de assinatura
      await billingApi.subscribeToPlan(planId);

      setSuccess(true);
      setTimeout(() => onSuccess(), 2000);
    } catch (err) {
      console.error(err);
      alert("Falha ao processar o pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h3>Informações Pessoais</h3>
      <div className={styles.row}>
        <input
          type="text"
          name="fullName"
          placeholder="Nome completo"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <input
        type="tel"
        name="phone"
        placeholder="Telefone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <h3>Método de Pagamento</h3>
      <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
        <option value="card">Cartão de Crédito</option>
        <option value="pix">PIX</option>
        <option value="boleto">Boleto Bancário</option>
      </select>

      {form.paymentMethod === "card" && (
        <>
          <h3>Informações do Cartão</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Número do cartão"
            value={form.cardNumber}
            onChange={handleChange}
            required
          />
          <div className={styles.row}>
            <input
              type="text"
              name="expiry"
              placeholder="MM/AA"
              value={form.expiry}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={form.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading || success}
        onClick={handleSubscribe}
        className={styles.paymentBtn}
      >
        {loading ? "Processando..." : success ? "Assinado!" : "Finalizar Pagamento"}
      </button>
    </form>
  );
};
