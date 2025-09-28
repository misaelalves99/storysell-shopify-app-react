// storysell-shopify-app/src/components/Home/FeaturedStories.tsx
import React from "react";
import { Story } from "../../types/story.types";
import styles from "./FeaturedStories.module.css";

interface Props {
  stories: Story[];
}

export const FeaturedStories: React.FC<Props> = ({ stories }) => {
  return (
    <section>
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
  );
};
