import { createContext } from "react";
import type { MealDetail } from "../components/RecipeCard";

export interface User {
  id: string;
  userName: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  favorites: MealDetail[];
  login: () => void;
  logout: () => void;
  toggleFavorite: (meal: MealDetail) => void;
  isFavorite: (mealId: string) => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  favorites: [],
  login: () => console.warn("Login function"),
  logout: () => console.warn("Logout function"),
  toggleFavorite: () => console.warn("toggleFavorite function"),
  isFavorite: () => false,
});