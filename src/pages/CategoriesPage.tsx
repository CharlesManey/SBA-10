import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import useFetch from "../hooks/useFetch";
import type { CategoriesResponse } from "../types/meal";

function CategoriesPage() {
  const { data, loading, error } = useFetch<CategoriesResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  if (loading) return <Spinner label="Loading categories..." />;
  if (error) return <ErrorMessage message={error} centered={true} />;

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Explore Categories</h1>
          <p className="text-gray-600">Browse recipes by category</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.categories.map((category) => (
            <Link
              key={category.idCategory}
              to={`/category/${category.strCategory}`}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                {/* Category Image */}
                <div className="relative overflow-hidden bg-gray-200 h-48">
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Category Name */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-amber-900 group-hover:text-amber-700 transition-colors">
                    {category.strCategory}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Click to explore recipes</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {!data?.categories || data.categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesPage;
