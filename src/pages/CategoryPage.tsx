
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import useFetch from "../hooks/useFetch";
import type { CategoryFilterResponse, MealPreview } from "../types/meal";
import { Link } from "react-router-dom";

function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  // Fetch meals for the selected category
  const url = categoryName
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    : "";

  const { data, loading, error } = useFetch<CategoryFilterResponse>(url);

  if (!categoryName) {
    return (
      <ErrorMessage
        message="Invalid category. Please select a category from the categories page."
        centered={true}
      />
    );
  }

  if (loading) return <Spinner label={`Loading ${categoryName} recipes...`} />;
  if (error)
    return (
      <ErrorMessage message={error} centered={true} />
    );

  const meals = data?.meals || [];

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/categories")}
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium mb-4 transition-colors"
          >
            <span>←</span>
            <span>Back to Categories</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-amber-900 mb-2">
              {categoryName} Recipes
            </h1>
            <p className="text-gray-600">
              {meals.length} recipe{meals.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {/* Meals Grid */}
        {meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal: MealPreview) => (
              <Link
                key={meal.idMeal}
                to={`/recipe/${meal.idMeal}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  {/* Meal Image */}
                  <div className="relative overflow-hidden bg-gray-200 h-40">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Meal Name */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="font-semibold text-amber-900 group-hover:text-amber-700 line-clamp-2 transition-colors">
                      {meal.strMeal}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2">Click to view recipe</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recipes found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;