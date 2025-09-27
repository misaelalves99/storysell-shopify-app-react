import { useProduct } from './useProduct';

export const useProductStories = () => {
  const { products } = useProduct();
  return products.slice(0, 5); // exemplo: retorna os 5 primeiros produtos como stories
};
