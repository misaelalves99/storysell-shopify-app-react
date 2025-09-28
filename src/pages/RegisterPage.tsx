// storysell-shopify-app/src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";
import styles from "./RegisterPage.module.css";

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(fullName, email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Registrar</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
        <p>
          Já tem conta? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
