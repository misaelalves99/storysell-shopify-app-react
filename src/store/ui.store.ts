import { createContext } from 'react';

export type UIStore = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const uiStore: UIStore = {
  isLoading: false,
  setLoading: () => {}
};
