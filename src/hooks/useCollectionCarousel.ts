import { useCollection } from "./useCollection";

export const useCollectionCarousel = () => {
  const { collections } = useCollection();
  return collections;
};
