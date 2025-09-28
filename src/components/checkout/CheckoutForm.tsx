// storysell-shopify-app/src/components/checkout/CheckoutForm.tsx
import React, { useState } from "react";
import { useBilling } from "../../hooks/useBilling";
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
  const { subscribe } = useBilling();

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
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.fullName || !form.email || !form.phone) return false;
    if (form.paymentMethod === "card") {
      return form.cardNumber && form.expiry && form.cvv;
    }
    return true;
  };

  const handleSubscribe = async () => {
    if (!validateForm()) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simula processamento de pagamento
      await new Promise((res) => setTimeout(res, 1500));

      // Usa contexto de billing
      await subscribe(planId);

      setSuccess(true);
      setTimeout(() => onSuccess(), 2000);
    } catch (err) {
      console.error(err);
      setError("Falha ao processar o pagamento. Tente novamente.");
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
      <select
        name="paymentMethod"
        value={form.paymentMethod}
        onChange={handleChange}
        className={styles.paymentSelect}
      >
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

      {error && <p className={styles.error}>{error}</p>}

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
