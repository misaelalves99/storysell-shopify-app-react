import React, { createContext, useState, useEffect } from "react";
import { Story } from "../../types/story.types";
import { getStories } from "../../api/story.api";

type StoryContextType = {
  stories: Story[];
  fetchStories: () => Promise<void>;
};

export const StoryContext = createContext<StoryContextType | undefined>(undefined);

type Props = { children: React.ReactNode };

export const StoryProvider: React.FC<Props> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);

  const fetchStories = async () => {
    try {
      const data = await getStories();
      setStories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchStories(); }, []);

  return <StoryContext.Provider value={{ stories, fetchStories }}>{children}</StoryContext.Provider>;
};
