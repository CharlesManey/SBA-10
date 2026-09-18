import { useSearchParams, Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import type { MealDetail } from "../components/RecipeCard";

interface SearchResponse {
  meals: MealDetail[] | null;
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const url = query
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
    : "";

  const { data, loading, error } = useFetch<SearchResponse>(url);
  const meals = data?.meals || [];

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium mb-4 transition-colors cursor-pointer"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>

        <SearchBar initialValue={query} />

        <div className="mb-6 flex justify-between items-center border-b border-amber-200/60 pb-3 mt-8">
          <h1 className="text-2xl font-bold text-amber-900">
            {query ? `Search Results for "${query}"` : "Enter a search term"}
          </h1>
          {query && (
            <span className="text-sm text-stone-500 font-medium">
              {meals.length} recipe{meals.length !== 1 ? "s" : ""} found
            </span>
          )}
        </div>

        {loading && <Spinner label={`Searching for "${query}"...`} />}
        {error && <ErrorMessage message={error} centered />}

        {!loading && !error && meals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <Link
                key={meal.idMeal}
                to={`/recipe/${meal.idMeal}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-stone-100">
                  <div className="relative overflow-hidden bg-stone-100 h-48">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {meal.strCategory && (
                      <span className="absolute top-3 left-3 bg-amber-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {meal.strCategory}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-amber-900 group-hover:text-amber-600 text-lg line-clamp-1 transition-colors">
                        {meal.strMeal}
                      </h3>
                      {meal.strArea && (
                        <p className="text-xs text-amber-700 font-medium mt-1">
                          📍 {meal.strArea}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-amber-600 font-semibold mt-4 flex items-center gap-1">
                      View Recipe ➔
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && !error && query && meals.length === 0 && (
          <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-amber-200 mt-6">
            <p className="text-stone-500 text-lg">
              No recipes found matching "{query}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}



















// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// function SearchPage() {
//   const [searchParams] = useSearchParams();
//   console.log(searchParams.get("s"));
//   const value = searchParams.get("s");

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(
//         `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
//       );
//       const data = await res.json();
//       console.log(data);
//     };
//     fetchData();
//   }, [value]);

//   return (
//     <div>
//       <h1>Search Page</h1>
//     </div>
//   );
// }

// export default SearchPage;