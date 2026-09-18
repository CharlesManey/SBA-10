import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RecipeCard from "../components/RecipeCard";

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(AuthContext);

  return (
    <main className="min-h-screen bg-amber-50/50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 text-center mb-8">
          Your Favorite Recipes
        </h1>

        {favorites.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12 px-6 bg-white rounded-2xl border border-dashed border-amber-300 shadow-xs">
            <p className="text-stone-600 text-base font-medium mb-4">
              You haven't added any favorite recipes yet.
            </p>
            <Link
              to="/categories"
              className="inline-block px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
            >
              Explore Recipes ➔
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {favorites.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoritesPage;