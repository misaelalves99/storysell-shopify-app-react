// storysell-shopify-app/src/pages/Home.tsx
import React, { useEffect, useState, useRef } from "react";
import { Product } from "../types/product.types";
import { Story } from "../types/story.types";
import { getProducts } from "../lib/fakeApi/fakeProductApi";
import { getStories } from "../lib/fakeApi/fakeStoryApi";
import { getCollections } from "../lib/fakeApi/fakeCollectionApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";
import { useBilling } from "../hooks/useBilling";
import styles from "./Home.module.css";

type CollectionWithProducts = {
  id: string;
  name: string;
  products: Product[];
};

export const Home: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<CollectionWithProducts[]>([]);
  const [isPlansOpen, setIsPlansOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentPlan } = useBilling();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const plans = [
    {
      id: "free",
      name: "Plano Gratuito",
      price: "R$0 / 1 mês",
      description: "Teste gratuito do app por 1 mês",
      features: ["Testar o app", "Funcionalidades limitadas"],
    },
    {
      id: "intermediate",
      name: "Plano Intermediário",
      price: "R$49,90 / mês",
      description: "Desbloqueia stories na página de produtos",
      features: ["Stories na página do produto"],
    },
    {
      id: "complete",
      name: "Plano Completo",
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

  // Scroll automático de Stories de produtos
  useEffect(() => {
    if (!scrollRef.current) return;
    const interval = setInterval(() => {
      const container = scrollRef.current!;
      const maxScroll = container.scrollWidth - container.clientWidth;
      let newPos = scrollPos + 1; // velocidade do scroll
      if (newPos > maxScroll) newPos = 0;
      container.scrollTo({ left: newPos, behavior: "smooth" });
      setScrollPos(newPos);
    }, 20);
    return () => clearInterval(interval);
  }, [scrollPos]);

  const handleSubscribe = (planId: string) => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/checkout/${planId}`);
    setIsPlansOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Impulsione sua loja Shopify com Stories & Reels</h1>
          <p>
            Aumente o engajamento e as vendas adicionando vídeos de stories nas páginas de produtos,
            destaques na página inicial e carrosséis de coleções.
          </p>
          <button className={styles.openPlansBtn} onClick={() => setIsPlansOpen(true)}>
            Ver Planos
          </button>
        </div>
      </section>

      {/* Modal de Planos */}
      {isPlansOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsPlansOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
                  <button className={styles.subscribeBtn} onClick={() => handleSubscribe(plan.id)}>
                    Assinar
                  </button>
                </div>
              ))}
            </div>
            <button className={styles.closeBtn} onClick={() => setIsPlansOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Product Stories - Carrossel horizontal */}
      {(currentPlan?.id === "intermediate" || currentPlan?.id === "complete") && products.length > 0 && (
        <section className={styles.productStories}>
          <h2>Stories de Produtos</h2>
          <div className={styles.scrollWrapper} ref={scrollRef}>
            {products.slice(0, 10).map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img src={product.images[0]} alt={product.title} />
                <h3>{product.title}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Stories */}
      {currentPlan?.id === "complete" && stories.length > 0 && (
        <section className={styles.featuredStories}>
          <h2>Stories em Destaque</h2>
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

      {/* Reels Collection */}
      {currentPlan?.id === "complete" && collections.length > 0 && (
        <section className={styles.collectionCarousel}>
          <h2>Reels por Coleção</h2>
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
