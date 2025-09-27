import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext/ProductContext";

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProduct must be used within ProductProvider");
  return context; // deve retornar { products, fetchProducts }
};
