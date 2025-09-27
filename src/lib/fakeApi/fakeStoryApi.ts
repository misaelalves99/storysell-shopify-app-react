// storysell-shopify-app/src/lib/fakeApi/fakeStoryApi.ts
import { Story } from "../../types/story.types";

const fakeStories: Story[] = [
  {
    id: "s1",
    title: "Summer Collection Story",
    image: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg",
    link: "https://www.w3schools.com/html/mov_bbb.mp4",
    products: ["p1", "p3"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "s2",
    title: "Winter Collection Story",
    image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
    link: "https://www.w3schools.com/html/movie.mp4",
    products: ["p2"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "s3",
    title: "New Arrivals Story",
    image: "https://images.pexels.com/photos/1005019/pexels-photo-1005019.jpeg",
    link: "https://www.w3schools.com/html/mov_bbb.mp4",
    products: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "s4",
    title: "Accessories Launch Story",
    image: "https://images.pexels.com/photos/279791/pexels-photo-279791.jpeg",
    link: "https://www.w3schools.com/html/movie.mp4",
    products: ["p4", "p5"],
    createdAt: new Date().toISOString(),
  },
];

export const getStories = async (): Promise<Story[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(fakeStories), 500));
};
