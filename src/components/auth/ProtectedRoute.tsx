// storysell-shopify-app/src/components/auth/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";

type Props = {
  children: JSX.Element;
};

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // ou um spinner elegante

  if (!user) return <Navigate to="/login" replace />;

  return children;
};
