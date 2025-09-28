// storysell-shopify-app/src/types/story.types.ts

export type Story = {
  id: string;
  title: string;
  image: string;        // thumbnail ou capa do story
  link?: string;        // vídeo ou conteúdo
  products: string[];  // array de product IDs
  createdAt: string;
};
