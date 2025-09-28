// storysell-shopify-app/src/contexts/auth/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import * as authApi from "../../api/auth.api";

export type AuthContextType = {
  user: authApi.User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = { children: React.ReactNode };

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<authApi.User | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicializa usuário logado do localStorage / fake API
  useEffect(() => {
    const loggedUser = authApi.getLoggedUser();
    if (loggedUser) setUser(loggedUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const loggedUser = await authApi.login({ email, password });
      setUser(loggedUser);
    } catch (err) {
      console.error("Login failed:", err);
      throw err; // permite tratar o erro na UI
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    setLoading(true);
    try {
      const newUser = await authApi.register({ fullName, email, password });
      setUser(newUser);
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
