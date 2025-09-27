// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";
import { CollectionPage } from "./pages/CollectionPage";
import { Dashboard } from "./pages/Dashboard";
import { CheckoutPlan } from "./pages/CheckoutPlan"; // ✅ Nova rota

import { ProductProvider } from "./contexts/ProductContext/ProductProvider";
import { CollectionProvider } from "./contexts/CollectionContext/CollectionProvider";
import { BillingProvider } from "./contexts/BillingContext/BillingProvider";

import styles from "./App.module.css";

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Router>
        <BillingProvider>
          <ProductProvider>
            <CollectionProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/collections" element={<CollectionPage />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/checkout/:planId" element={<CheckoutPlan />} /> {/* ✅ */}
              </Routes>
            </CollectionProvider>
          </ProductProvider>
        </BillingProvider>
      </Router>
    </div>
  );
};
