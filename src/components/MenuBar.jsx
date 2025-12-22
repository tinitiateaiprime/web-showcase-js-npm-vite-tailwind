import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchData from "../data/searchData";

const MenuBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Handle search
  const handleSearch = () => {
    if (query.trim() === "") return; // Prevent empty search

    // Check if query matches a page name
    const page = searchData.pages.find((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (page) {
      navigate(page.path); // Navigate to matched page
    } else {
      onSearch(query); // Pass query to Catalog page for filtering products
      navigate("/catalog");
    }
    
    setQuery(""); // Clear input after search
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <nav>
        {searchData.pages.map((page) => (
          <a key={page.name} href={page.path} className="mr-4">
            {page.name}
          </a>
        ))}
      </nav>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search for pages or products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="p-2 rounded-md text-white"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
