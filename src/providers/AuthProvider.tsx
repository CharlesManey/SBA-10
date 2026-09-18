import { useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import type { MealDetail } from "../components/RecipeCard";
import useLocalStorage from "../hooks/useLocalStorage"; // Adjust path if needed

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({ id: "101", userName: "SoloDev101" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Replace useState with your custom useLocalStorage hook
  const [favorites, setFavorites] = useLocalStorage<MealDetail[]>("recipe_favorites", []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
  };

  const toggleFavorite = (meal: MealDetail) => {
    if (!isAuthenticated) return;

    setFavorites((prev: MealDetail[]) =>
      prev.some((item) => item.idMeal === meal.idMeal)
        ? prev.filter((item) => item.idMeal !== meal.idMeal)
        : [...prev, meal]
    );
  };

  const isFavorite = (mealId: string) =>
    favorites.some((item: MealDetail) => item.idMeal === mealId);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;