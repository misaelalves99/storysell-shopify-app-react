// storysell-shopify-app/src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";
import { useBilling } from "../hooks/useBilling";
import { Product } from "../types/product.types";
import { Story } from "../types/story.types";
import { getProducts } from "../lib/fakeApi/fakeProductApi";
import { getStories } from "../lib/fakeApi/fakeStoryApi";
import { getCollections } from "../lib/fakeApi/fakeCollectionApi";

// Componentes modularizados
import { Hero } from "../components/Home/Hero";
import { PlansModal } from "../components/Home/PlansModal";
import { ProductStories } from "../components/Home/ProductStories";
import { FeaturedStories } from "../components/Home/FeaturedStories";
import { CollectionsCarousel } from "../components/Home/CollectionsCarousel";

export type CollectionWithProducts = {
  id: string;
  name: string;
  products: Product[];
};

export const Home: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<CollectionWithProducts[]>([]);
  const [isPlansOpen, setIsPlansOpen] = useState(false);

  const { user } = useAuth();
  const { currentPlan } = useBilling();
  const navigate = useNavigate();

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

  // Função para abrir modal de planos com verificação de login
  const handleOpenPlans = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsPlansOpen(true);
  };

  return (
    <div>
      {/* Hero */}
      <Hero onOpenPlans={handleOpenPlans} />

      {/* Modal de Planos */}
      <PlansModal isOpen={isPlansOpen} plans={plans} onClose={() => setIsPlansOpen(false)} />

      {/* Stories de Produtos */}
      {(currentPlan?.id === "intermediate" || currentPlan?.id === "complete") && products.length > 0 && (
        <ProductStories products={products.slice(0, 10)} />
      )}

      {/* Stories em Destaque */}
      {currentPlan?.id === "complete" && stories.length > 0 && <FeaturedStories stories={stories} />}

      {/* Carrossel de Coleções */}
      {currentPlan?.id === "complete" && collections.length > 0 && (
        <CollectionsCarousel collections={collections} />
      )}
    </div>
  );
};
