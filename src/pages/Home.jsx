import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const featuredImages = [
  "https://source.unsplash.com/featured/?electronics",
  "https://source.unsplash.com/featured/?fashion",
  "https://source.unsplash.com/featured/?gadgets",
];

const allProducts = [
  {
    title: "Wireless Headphones",
    price: "$99",
    category: "Electronics",
    image: "https://source.unsplash.com/featured/?headphones",
  },
  {
    title: "Smartwatch",
    price: "$149",
    category: "Electronics",
    image: "https://source.unsplash.com/featured/?smartwatch",
  },
  {
    title: "Sneakers",
    price: "$79",
    category: "Fashion",
    image: "https://source.unsplash.com/featured/?sneakers",
  },
  {
    title: "Jacket",
    price: "$89",
    category: "Fashion",
    image: "https://source.unsplash.com/featured/?jacket",
  },
  {
    title: "Backpack",
    price: "$59",
    category: "Fashion",
    image: "https://source.unsplash.com/featured/?backpack",
  },
  {
    title: "Bluetooth Speaker",
    price: "$45",
    category: "Electronics",
    image: "https://source.unsplash.com/featured/?speaker",
  },
];

const categories = ["All", "Electronics", "Fashion"];

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % featuredImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.title} added to cart!`);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#111" : "#f5f5f5",
        color: darkMode ? "#fff" : "#222",
        padding: "20px",
        fontFamily: "sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      {/* Cart Icon */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 80,
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FaShoppingCart size={24} />
        <span
          style={{
            marginLeft: "6px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {cart.length}
        </span>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "10px 20px",
          background: darkMode ? "#fff" : "#222",
          color: darkMode ? "#222" : "#fff",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Header */}
      <div style={{ textAlign: "center", paddingTop: "60px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Welcome to TrendyCart</h1>
        <p style={{ marginBottom: "20px", fontSize: "1.1rem" }}>
          Discover amazing products curated just for you!
        </p>
        <Link
          to="/catalog"
          style={{
            padding: "10px 30px",
            background: "linear-gradient(to right, #6366f1, #8b5cf6)",
            color: "#fff",
            fontWeight: "bold",
            textDecoration: "none",
            borderRadius: "30px",
          }}
        >
          Explore Catalog
        </Link>
      </div>

      {/* Slider */}
      <div
        style={{
          margin: "50px auto 30px",
          maxWidth: "600px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <img
          src={featuredImages[sliderIndex]}
          alt="slide"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        />
      </div>

      {/* Search + Filter */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingBottom: "60px",
        }}
      >
        {paginatedProducts.map((product, index) => (
          <div
            key={index}
            style={{
              backgroundColor: darkMode ? "#1f1f1f" : "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: darkMode
                ? "0 4px 16px rgba(255,255,255,0.05)"
                : "0 4px 12px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "16px" }}>
              <h3 style={{ marginBottom: "8px", fontSize: "1.1rem", fontWeight: "600" }}>
                {product.title}
              </h3>
              <p style={{ marginBottom: "12px", color: "#888", fontSize: "1rem" }}>
                {product.price}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "linear-gradient(to right, #14b8a6, #3b82f6)",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                Add to Cart
              </button>
              <button
                style={{
                  width: "100%",
                  padding: "8px",
                  background: darkMode ? "#333" : "#eee",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              style={{
                margin: "0 6px",
                padding: "8px 12px",
                background: currentPage === i + 1 ? "#6366f1" : "#ddd",
                color: currentPage === i + 1 ? "#fff" : "#333",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
