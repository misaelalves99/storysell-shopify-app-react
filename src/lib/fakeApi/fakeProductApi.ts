// storysell-shopify-app/src/lib/fakeApi/fakeProductApi.ts
import { Product } from "../../types/product.types";

const fakeProducts: Product[] = [
  {
    id: "p1",
    title: "Red Shoes",
    description: "Comfortable red running shoes",
    price: 49.9,
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
    ],
    available: true,
    collectionId: "c1",
  },
  {
    id: "p2",
    title: "Blue Jacket",
    description: "Stylish winter jacket",
    price: 89.9,
    images: [
      "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg"
    ],
    available: true,
    collectionId: "c2",
  },
  {
    id: "p3",
    title: "Green Hat",
    description: "Casual cotton hat",
    price: 19.9,
    images: [
      "https://images.pexels.com/photos/936118/pexels-photo-936118.jpeg"
    ],
    available: false,
    collectionId: "c1",
  },
  {
    id: "p4",
    title: "Yellow T-Shirt",
    description: "Bright yellow cotton t-shirt",
    price: 25.0,
    images: [
      "https://images.pexels.com/photos/1005019/pexels-photo-1005019.jpeg"
    ],
    available: true,
    collectionId: "c3",
  },
  {
    id: "p5",
    title: "Leather Wallet",
    description: "Genuine leather wallet",
    price: 39.9,
    images: [
      "https://images.pexels.com/photos/279791/pexels-photo-279791.jpeg"
    ],
    available: true,
    collectionId: "c3",
  },
];

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(fakeProducts), 500));
};

export const getProductById = async (id: string): Promise<Product> => {
  const product = fakeProducts.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  return new Promise((resolve) => setTimeout(() => resolve(product), 500));
};
