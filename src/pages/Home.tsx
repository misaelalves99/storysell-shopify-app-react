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

// Novos componentes
import { FeaturesHighlight } from "../components/Home/FeaturesHighlight";
import { Testimonials } from "../components/Home/Testimonials";
import { PlanCards } from "../components/Home/PlanCards";

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
  const [loadingContent, setLoadingContent] = useState(true);

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

  // 🔹 Busca dados premium
  useEffect(() => {
    const fetchContent = async () => {
      if (!currentPlan || currentPlan.id === "free") {
        setLoadingContent(false);
        return;
      }

      setProducts(await getProducts());
      setStories(await getStories());
      setCollections(await getCollections());
      setLoadingContent(false);
    };

    fetchContent();
  }, [currentPlan]);

  const handleOpenPlans = () => setIsPlansOpen(true);

  const handleSubscribe = (planId: string) => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/checkout/${planId}`);
  };

  // Usuário logado com plano válido
  const hasIntermediatePlan = !!user && (currentPlan?.id === "intermediate" || currentPlan?.id === "complete");
  const hasCompletePlan = !!user && currentPlan?.id === "complete";

  // Usuário tem plano pago (intermediate ou complete)
  const hasPaidPlan = !!user && currentPlan && currentPlan.id !== "free";

  return (
    <div>
      {/* Hero */}
      <Hero onOpenPlans={handleOpenPlans} />

      {/* Modal de Planos - só aparece se não tiver plano pago */}
      {!hasPaidPlan && <PlansModal isOpen={isPlansOpen} plans={plans} onClose={() => setIsPlansOpen(false)} />}

      {/* Features / Destaques do App - propaganda */}
      {!hasPaidPlan && (
        <FeaturesHighlight
          features={[
            { id: "f1", title: "Stories na Home", description: "Destaque seus produtos com stories interativos." },
            { id: "f2", title: "Carrossel de Coleções", description: "Mostre várias coleções de forma elegante." },
            { id: "f3", title: "Analytics de Engajamento", description: "Veja quais produtos estão mais visualizados." },
          ]}
        />
      )}

      {/* Cards de Assinatura - propaganda */}
      {!hasPaidPlan && <PlanCards plans={plans} onSubscribe={handleSubscribe} />}

      {/* Conteúdos premium apenas para usuários com plano pago */}
      {!loadingContent && hasIntermediatePlan && products.length > 0 && (
        <ProductStories products={products.slice(0, 10)} />
      )}
      {!loadingContent && hasCompletePlan && stories.length > 0 && (
        <FeaturedStories stories={stories} />
      )}
      {!loadingContent && hasCompletePlan && collections.length > 0 && (
        <CollectionsCarousel collections={collections} />
      )}

      {/* Testimonials - sempre visíveis */}
      <Testimonials
        testimonials={[
          { id: "t1", name: "Ana Souza", avatar: "/assets/avatars/ana.jpg", comment: "Melhor app para engajar meus clientes!" },
          { id: "t2", name: "Carlos Lima", avatar: "/assets/avatars/carlos.jpg", comment: "Meus produtos agora são mais visualizados." },
          { id: "t3", name: "Maria Fernanda", avatar: "/assets/avatars/maria.jpg", comment: "Recomendo para qualquer loja Shopify!" },
        ]}
      />
    </div>
  );
};
