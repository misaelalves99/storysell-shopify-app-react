import { Story } from "../types/story.types";
import { getStories as getFakeStories } from "../lib/fakeApi/fakeStoryApi";

export const getStories = async (): Promise<Story[]> => {
  // Para desenvolvimento, usamos a API fake
  return getFakeStories();
};
