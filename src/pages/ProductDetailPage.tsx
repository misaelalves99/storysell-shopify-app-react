// storysell-shopify-app/src/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types/product.types";
import * as fakeApi from "../lib/fakeApi/fakeProductApi";
import { getStories } from "../lib/fakeApi/fakeStoryApi";
import { Story } from "../types/story.types";
import styles from "./ProductDetailPage.module.css";
import { FaTimes } from "react-icons/fa";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string>("");

  // stories relacionados
  const [stories, setStories] = useState<Story[]>([]);
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await fakeApi.getProducts();
      const found = products.find((p) => p.id === id);
      if (!found) {
        navigate("/products");
        return;
      }
      setProduct(found);
      setMainImage(found.images[0]);
      setLoading(false);

      // busca stories relacionados ao produto
      const allStories = await getStories();
      const related = allStories.filter((s) => s.products.includes(found.id));
      setStories(related);
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

        {/* Stories relacionados */}
        {stories.length > 0 && (
          <div className={styles.storiesSection}>
            <h2>Stories do Produto</h2>
            <div className={styles.storiesCarousel}>
              {stories.map((story) => (
                <div
                  key={story.id}
                  className={styles.storyThumb}
                  onClick={() => setActiveStory(story)}
                >
                  <img src={story.image} alt={story.title} />
                  <span>{story.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de story */}
      {activeStory && (
        <div className={styles.storyModal}>
          <div className={styles.storyOverlay} onClick={() => setActiveStory(null)} />
          <div className={styles.storyContent}>
            <button className={styles.closeBtn} onClick={() => setActiveStory(null)}>
              <FaTimes size={20} />
            </button>
            <video
              src={activeStory.link}
              controls
              autoPlay
              className={styles.storyVideo}
            />
            <h3>{activeStory.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
};
