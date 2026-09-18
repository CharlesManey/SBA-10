import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard, { type MealDetail } from "../components/RecipeCard";

interface MealLookupResponse {
  meals: MealDetail[] | null;
}

function RecipeDetailPage() {
  const { mealId } = useParams<{ mealId: string }>();
  const navigate = useNavigate();

  const url = mealId
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    : "";

  const { data, loading, error } = useFetch<MealLookupResponse>(url);

  if (loading) return <Spinner label="Loading recipe details..." />;

  if (error || !data?.meals) {
    return (
      <div className="min-h-screen bg-amber-50/50 py-12 px-4 text-center">
        <ErrorMessage
          message={error || `Recipe with ID "${mealId}" was not found.`}
          centered
        />
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const meal = data.meals[0];

  return (
    <div className="min-h-screen min-w-11/12 bg-linear-to-b from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-4xl mx-auto w-full min-w-11/12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium mb-6 transition-colors cursor-pointer"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        <RecipeCard meal={meal} />
      </div>
    </div>
  );
}



// function RecipeDetailPage() {
//   return(
//     <div className="min-w-screen min-h-screen bg-linear-to-b from-amber-50 to-orange-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto flex flex-col items-center">
//         <h2 className="text-4xl font-bold text-amber-900 mb-2">Recipe Details</h2>
//         <RecipeCard meal={} />
//       </div>
//     </div>
//   );
// }

export default RecipeDetailPage;