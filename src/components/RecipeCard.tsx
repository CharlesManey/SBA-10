import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb?: string;
  strTags?: string;
  [key: string]: string | null | undefined;
}

interface RecipeCardProps {
  meal: MealDetail;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ meal }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const { isAuthenticated, toggleFavorite, isFavorite } = useContext(AuthContext);
  const navigate = useNavigate();

  const favorited = isFavorite(meal.idMeal);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents flipping when clicking the heart button
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    toggleFavorite(meal);
  };

  const getIngredients = () => {
    const ingredients: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        });
      }
    }
    return ingredients;
  };

  const getInstructions = () => {
    if (!meal.strInstructions) return [];
    return meal.strInstructions
      .split(/\r?\n/)
      .map((step) => step.trim())
      .filter((step) => step.length > 0);
  };

  const ingredients = getIngredients();
  const instructions = getInstructions();

  return (
    <div className="flex justify-center items-center w-full my-6">
      <div className="w-full max-w-xl h-150 min-w-[320px] perspective-[1000px]">
        <div
          className={`relative w-full h-full duration-700 transform-3d transition-transform ${
            isFlipped ? "transform-[rotateY(180deg)]" : ""
          }`}
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden backface-hidden transform-[rotateY(0deg)] flex flex-col justify-between">
            <div>
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-full object-cover"
                />
                {meal.strCategory && (
                  <span className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    {meal.strCategory}
                  </span>
                )}

                {/* Favorite Heart Button with explicit Z-Translation */}
                <button
                  type="button"
                  onClick={handleFavoriteClick}
                  title={favorited ? "Remove from favorites" : "Add to favorites"}
                  className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer transform-[translateZ(1px)]"
                >
                  <span className="text-xl leading-none">
                    {favorited ? "❤️" : "🤍"}
                  </span>
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-amber-900 leading-snug">
                  {meal.strMeal}
                </h2>
                {meal.strArea && (
                  <p className="text-amber-700 font-medium text-sm mt-1">
                    📍 {meal.strArea} Cuisine
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                View Ingredients & Recipe Steps ➔
              </button>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 w-full h-full bg-amber-950 text-amber-50 rounded-2xl shadow-xl border border-amber-900 p-6 backface-hidden transform-[rotateY(180deg)] flex flex-col justify-between">
            <div className="overflow-y-auto pr-2 space-y-6">
              <div className="pb-3 border-b border-amber-800/80">
                <h3 className="text-xl font-bold text-amber-400">{meal.strMeal}</h3>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                  🛒 Ingredients ({ingredients.length})
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-amber-100">
                  {ingredients.map((item, idx) => (
                    <li
                      key={idx}
                      className="bg-amber-900/50 p-2 rounded-lg border border-amber-800/50 flex justify-between gap-2"
                    >
                      <span className="font-medium text-amber-200">{item.name}</span>
                      <span className="text-amber-400 font-mono text-xs">
                        {item.measure}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                  👨‍🍳 Preparation Instructions
                </h4>
                <ol className="space-y-3 text-sm text-amber-100">
                  {instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-3 leading-relaxed">
                      <span className="font-bold text-amber-400 min-w-5">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="mt-4 w-full py-3 px-4 bg-amber-800 hover:bg-amber-700 text-amber-100 font-semibold rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              ↩ Back to Image & Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;