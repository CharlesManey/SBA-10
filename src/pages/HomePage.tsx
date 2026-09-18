import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

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
        <h1 className="text-4xl font-bold text-amber-900 mb-2">Home Page</h1>
        
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
          className="bg-white border rounded-md px-2 py-0.5"
          type="text"
          name=""
          id=""
          placeholder="Search for a recipe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input className="border px-2 rounded-md bg-amber-500 hover:bg-amber-300 font-semibold" type="submit" value="Search" />
        </form>
      </div>
    </div>
  );
}

export default HomePage;