import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    // eg -> /search?s=chicken
    navigate(`/search?s=${searchTerm}`)
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-900 tracking-tight">
          Find Your Next Meal
        </h1>
        <p className="text-stone-600 mt-3 text-base sm:text-lg">
          Search hundreds of delicious recipes by ingredient or dish name.
        </p>

        <SearchBar placeholder="Search e.g. Chicken, Pasta, Taco..." />
      </div>
    </div>
  );
}

export default HomePage;