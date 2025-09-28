// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { Product } from "../types/product.types";
import { Story } from "../types/story.types";
import { getProducts } from "../lib/fakeApi/fakeProductApi";
import { getStories } from "../lib/fakeApi/fakeStoryApi";
import { getCollections } from "../lib/fakeApi/fakeCollectionApi";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

type CollectionWithProducts = {
  id: string;
  name: string;
  products: Product[];
};

type Plan = {
  id: "free" | "intermediate" | "complete";
  name: string;
  price: string;
  description: string;
  features: string[];
};

export const Home: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<CollectionWithProducts[]>([]);
  const navigate = useNavigate();

  const currentPlan = { id: "free" }; // "free" | "intermediate" | "complete"

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free Plan",
      price: "R$0 / 1 mês",
      description: "Teste gratuito do app por 1 mês",
      features: ["Testar o app", "Funcionalidades limitadas"],
    },
    {
      id: "intermediate",
      name: "Intermediate Plan",
      price: "R$49,90 / mês",
      description: "Desbloqueia stories na página de produtos",
      features: ["Stories na página do produto"],
    },
    {
      id: "complete",
      name: "Complete Plan",
      price: "R$99,90 / mês",
      description: "Desbloqueia todas as funcionalidades",
      features: ["Stories na Home", "Stories no produto", "Carrossel de coleções"],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setStories(await getStories());
      setProducts(await getProducts());
      setCollections(await getCollections());
    };
    fetchData();
  }, []);

  const handleSubscribe = (planId: string) => {
    navigate(`/checkout/${planId}`);
  };

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Boost your Shopify store with Stories & Reels</h1>
          <p>
            Increase engagement and sales by adding video stories on product pages,
            highlights on the homepage, and carousel reels for collections.
          </p>
        </div>
      </section>

      <section className={styles.plans}>
        <h2>Escolha seu plano</h2>
        <div className={styles.plansGrid}>
          {plans.map((plan) => (
            <div key={plan.id} className={styles.planCard}>
              <h3>{plan.name}</h3>
              <p className={styles.price}>{plan.price}</p>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button
                className={styles.subscribeBtn}
                onClick={() => handleSubscribe(plan.id)}
              >
                Assinar
              </button>
            </div>
          ))}
        </div>
      </section>

      {(currentPlan.id === "intermediate" || currentPlan.id === "complete") && products.length > 0 && (
        <section className={styles.productStories}>
          <h2>Product Stories</h2>
          <div className={styles.productsGrid}>
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img src={product.images[0]} alt={product.title} />
                <h3>{product.title}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {currentPlan.id === "complete" && stories.length > 0 && (
        <section className={styles.featuredStories}>
          <h2>Featured Stories</h2>
          <div className={styles.storiesGrid}>
            {stories.map((story) => (
              <div key={story.id} className={styles.storyCard}>
                <video src={story.link} controls className={styles.storyVideo} />
                <h4>{story.title}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {currentPlan.id === "complete" && collections.length > 0 && (
        <section className={styles.collectionCarousel}>
          <h2>Reels Collection</h2>
          <div className={styles.carouselGrid}>
            {collections.map((collection) => (
              <div key={collection.id} className={styles.collectionCard}>
                <h3>{collection.name}</h3>
                <div className={styles.products}>
                  {collection.products.slice(0, 3).map((product) => (
                    <div key={product.id} className={styles.productCard}>
                      <img src={product.images[0]} alt={product.title} />
                      <p>{product.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
