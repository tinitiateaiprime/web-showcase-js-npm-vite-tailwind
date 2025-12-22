import { useState, useEffect } from "react";
import searchData from "../data/coursesData"; // Import your courses data

const Catalog = ({ searchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState(searchData.products);
  const [catalogQuery, setCatalogQuery] = useState("");

  // Effect to filter products when coming from global search
  useEffect(() => {
    if (searchQuery) {
      filterProducts(searchQuery);
    } else {
      setFilteredProducts(searchData.products);
    }
  }, [searchQuery]);

  // Function to filter products
  const filterProducts = (query) => {
    const filtered = searchData.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.price.includes(query)
    );
    setFilteredProducts(filtered);
  };

  // Handle search button click
  const handleSearch = () => {
    if (catalogQuery.trim() === "") return;
    filterProducts(catalogQuery);
    setCatalogQuery(""); // Clear input after search
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Catalog</h2>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={catalogQuery}
          onChange={(e) => setCatalogQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="p-2 border rounded-md text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-5 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md bg-white w-56 h-72 flex flex-col justify-between"
            >
              <div className="h-32 bg-gray-200 flex items-center justify-center">
                <img
                  src={product.image} // Image is now being imported properly
                  alt={product.name}
                  className="h-24 w-24 object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-700 text-sm">{product.description}</p>
              <p className="text-green-600 font-bold">{product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-red-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
