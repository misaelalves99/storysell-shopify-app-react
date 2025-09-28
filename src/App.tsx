// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CollectionPage } from "./pages/CollectionPage";
import { Dashboard } from "./pages/Dashboard";
import { CheckoutPlan } from "./pages/CheckoutPlan";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

import { Layout } from "./components/layout/Layout";

import { ProductProvider } from "./contexts/ProductContext/ProductProvider";
import { CollectionProvider } from "./contexts/CollectionContext/CollectionProvider";
import { BillingProvider } from "./contexts/BillingContext/BillingProvider";
import { AuthProvider } from "./contexts/auth/AuthContext";

import styles from "./App.module.css";

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Router>
        <AuthProvider>
          <BillingProvider>
            <ProductProvider>
              <CollectionProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/collections" element={<CollectionPage />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/checkout/:planId" element={<CheckoutPlan />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </Layout>
              </CollectionProvider>
            </ProductProvider>
          </BillingProvider>
        </AuthProvider>
      </Router>
    </div>
  );
};
