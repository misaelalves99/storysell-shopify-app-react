// storysell-shopify-app/src/components/stories/HomeStories.tsx
import React, { useEffect, useState } from "react";
import { Story } from "../../types/story.types";
import { getStories } from "../../lib/fakeApi/fakeStoryApi";
import { useBilling } from "../../hooks/useBilling";
import styles from "./HomeStories.module.css";

export const HomeStories: React.FC = () => {
  const { currentPlan } = useBilling();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getStories();
      setStories(data);
      setLoading(false);
    };
    fetch();
  }, []);

  // 🔹 Bloqueia se não for "complete"
  if (!currentPlan || currentPlan.id !== "complete") return null;

  if (loading) return <p>Loading stories...</p>;
  if (stories.length === 0) return <p>No stories available.</p>;

  return (
    <section className={styles.container}>
      <h2>Featured Stories</h2>
      <div className={styles.stories}>
        {stories.map((s) => (
          <div key={s.id} className={styles.card}>
            <video
              src={s.link}
              controls
              className={styles.video}
            />
            <h4>{s.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};
