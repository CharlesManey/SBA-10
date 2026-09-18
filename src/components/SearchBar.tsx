import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = "",
  placeholder = "Search recipes by name...",
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto my-6">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <span className="absolute left-4 text-amber-700/60 pointer-events-none text-lg">
          🔍
        </span>

        {/* Input Field (Extra right padding to prevent text under buttons) */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-32 py-3.5 bg-white rounded-2xl border border-amber-200 shadow-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
        />

        {/* Right Actions Container */}
        <div className="absolute right-2 flex items-center gap-2">
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="text-stone-400 hover:text-stone-600 text-xs font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;