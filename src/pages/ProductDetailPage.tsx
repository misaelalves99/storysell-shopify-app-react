// storysell-shopify-app/src/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types/product.types";
import * as fakeApi from "../lib/fakeApi/fakeProductApi";
import styles from "./ProductDetailPage.module.css";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await fakeApi.getProducts();
      const found = products.find((p) => p.id === id);
      if (!found) {
        navigate("/products"); // retorna se não encontrado
        return;
      }
      setProduct(found);
      setMainImage(found.images[0]);
      setLoading(false);
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading) return <p>Carregando produto...</p>;
  if (!product) return null;

  return (
    <div className={styles.container}>
      <div className={styles.imagesSection}>
        <img src={mainImage} alt={product.title} className={styles.mainImage} />
        {product.images.length > 1 && (
          <div className={styles.thumbnails}>
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title} ${idx}`}
                className={styles.thumb}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.infoSection}>
        <h1>{product.title}</h1>
        <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
        <p className={styles.description}>
          {product.description || "Descrição não disponível."}
        </p>
        <button className={styles.buyBtn}>Comprar</button>
      </div>
    </div>
  );
};
