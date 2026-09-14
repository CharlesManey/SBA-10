import { createContext } from "react";


interface FavoritesContextType {
  favorites: string[];
  addRecipeToFav: (id: string) => void;
  removeRecipeFromFav: (id: string) => void;
  isAlreadyInFav: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);