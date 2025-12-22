import React from "react";
const ProductCard = ({ product }) => (
  <div className="border rounded-lg p-4 shadow-md">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
    <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
    <p className="text-sm text-gray-600">{product.category}</p>
    <p className="font-bold">{product.price}</p>
  </div>
);
export default ProductCard;
