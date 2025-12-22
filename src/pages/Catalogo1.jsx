import React, { useState } from 'react';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star, Eye, Zap, Sparkles } from 'lucide-react';

export default function UniqueCatalog() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredItem, setHoveredItem] = useState(null);
  const [cart, setCart] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Items', color: 'from-violet-500 to-purple-600' },
    { id: 'electronics', name: 'Electronics', color: 'from-blue-500 to-cyan-600' },
    { id: 'fashion', name: 'Fashion', color: 'from-pink-500 to-rose-600' },
    { id: 'home', name: 'Home & Garden', color: 'from-green-500 to-emerald-600' },
    { id: 'sports', name: 'Sports', color: 'from-orange-500 to-amber-600' }
  ];

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      category: 'electronics',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 1247,
      image: 'https://via.placeholder.com/300x300/4f46e5/ffffff?text=Headphones',
      isNew: true,
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Smart Watch Ultra',
      category: 'electronics',
      price: 549.99,
      originalPrice: 699.99,
      rating: 4.9,
      reviews: 892,
      image: 'https://via.placeholder.com/300x300/059669/ffffff?text=Watch',
      isNew: false,
      badge: 'Premium'
    },
    {
      id: 3,
      name: 'Designer Sneakers',
      category: 'fashion',
      price: 189.99,
      originalPrice: 249.99,
      rating: 4.6,
      reviews: 543,
      image: 'https://via.placeholder.com/300x300/dc2626/ffffff?text=Sneakers',
      isNew: true,
      badge: 'Limited'
    },
    {
      id: 4,
      name: 'Yoga Mat Premium',
      category: 'sports',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 324,
      image: 'https://via.placeholder.com/300x300/7c3aed/ffffff?text=Yoga+Mat',
      isNew: false,
      badge: 'Eco-Friendly'
    },
    {
      id: 5,
      name: 'Smart Plant Pot',
      category: 'home',
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.5,
      reviews: 186,
      image: 'https://via.placeholder.com/300x300/16a34a/ffffff?text=Plant+Pot',
      isNew: true,
      badge: 'Smart Home'
    },
    {
      id: 6,
      name: 'Leather Jacket',
      category: 'fashion',
      price: 399.99,
      originalPrice: 499.99,
      rating: 4.8,
      reviews: 672,
      image: 'https://via.placeholder.com/300x300/b91c1c/ffffff?text=Jacket',
      isNew: false,
      badge: 'Classic'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const addToCart = (id) => {
    const newCart = new Set(cart);
    newCart.add(id);
    setCart(newCart);
  };

  const FloatingBubbles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-10 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 80 + 20}px`,
            height: `${Math.random() * 80 + 20}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 4}s`
          }}
        />
      ))}
    </div>
  );

  const ProductCard = ({ product }) => (
    <div
      className="group relative bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50"
      onMouseEnter={() => setHoveredItem(product.id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold transform -rotate-12 shadow-lg">
          {product.badge}
        </div>
      )}

      {/* New Badge */}
      {product.isNew && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-emerald-400 to-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Sparkles size={12} />
          <span>NEW</span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-2xl mb-4 bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className={`absolute top-4 right-4 flex flex-col space-y-2 transform transition-all duration-300 ${hoveredItem === product.id ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${favorites.has(product.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'}`}
          >
            <Heart size={16} fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
          </button>
          <button className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200">
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-800">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product.id)}
          className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            cart.has(product.id)
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
          }`}
        >
          <ShoppingCart size={18} />
          <span>{cart.has(product.id) ? 'Added to Cart' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      <FloatingBubbles />
      
      {/* Header */}
      <div className="relative z-10 bg-white/70 backdrop-blur-lg border-b border-white/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-12">
                  <Zap className="text-white" size={20} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">UniStore</h1>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md mx-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {/* Cart Badge */}
            <div className="relative">
              <button className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-200">
                <ShoppingCart size={20} />
              </button>
              {cart.size > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {cart.size}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white/80 text-gray-700 hover:bg-white border border-white/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* View Options */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-white/80 rounded-2xl p-1 border border-white/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-white'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-white'
                }`}
              >
                <List size={18} />
              </button>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/80 rounded-2xl border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}