import { createContext } from 'react';
import { Story } from '../types/story.types';

export type StoriesStore = {
  stories: Story[];
  setStories: (stories: Story[]) => void;
};

export const storiesStore: StoriesStore = {
  stories: [],
  setStories: () => {}
};
