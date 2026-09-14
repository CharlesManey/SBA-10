import type { ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FavoritesContext } from "../context/FavoritesContext";



interface FavoritesProviderProps {
  children: ReactNode;
}

function FavoritesProvider({children}: FavoritesProviderProps) {
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);

  const addRecipeToFav = (id: string): void => {
    setFavorites((prevFavorites: string[]) => {
      if(!prevFavorites.includes(id)) {
        return [...prevFavorites, id];
      }
      return prevFavorites;
    });
  };

  const removeRecipeFromFav = (id: string): void => {
    setFavorites((prevFavorites: string[]) =>
      prevFavorites.filter((favId:string) => favId !== id)
    );
  };

  const isAlreadyInFav = (id: string): boolean => {
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider
    value={{
      favorites,
      addRecipeToFav,
      removeRecipeFromFav,
      isAlreadyInFav,
    }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;