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
  {
    id: "s5",
    title: "Limited Edition Drop",
    image: "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg",
    link: "https://www.w3schools.com/html/mov_bbb.mp4",
    products: ["p6"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "s6",
    title: "Behind the Scenes",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    link: "https://www.w3schools.com/html/movie.mp4",
    products: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "s7",
    title: "Holiday Specials",
    image: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg",
    link: "https://www.w3schools.com/html/mov_bbb.mp4",
    products: ["p7", "p8"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "s8",
    title: "Collab Launch",
    image: "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg",
    link: "https://www.w3schools.com/html/movie.mp4",
    products: ["p9"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "s9",
    title: "Flash Sale Story",
    image: "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg",
    link: "https://www.w3schools.com/html/mov_bbb.mp4",
    products: ["p10", "p11"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "s10",
    title: "Customer Favorites",
    image: "https://images.pexels.com/photos/157675/pexels-photo-157675.jpeg",
    link: "https://www.w3schools.com/html/movie.mp4",
    products: ["p12"],
    createdAt: new Date().toISOString(),
  },
];

export const getStories = async (): Promise<Story[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(fakeStories), 500));
};
