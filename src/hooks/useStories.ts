import { useContext } from "react";
import { StoryContext } from "../contexts/StoryContext/StoryProvider";

export const useStories = () => {
  const context = useContext(StoryContext);
  if (!context) throw new Error("useStories must be used within StoryProvider");
  return context;
};
