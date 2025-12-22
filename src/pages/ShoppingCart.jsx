import React, { useState } from "react";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 1999, qty: 1, image: "https://via.placeholder.com/80" },
    { id: 2, name: "Smart Watch", price: 2999, qty: 2, image: "https://via.placeholder.com/80" },
    { id: 3, name: "Bluetooth Speaker", price: 1499, qty: 1, image: "https://via.placeholder.com/80" },
  ]);

  const handleQtyChange = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + change) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <h2 className="text-4xl font-bold text-indigo-700 mb-6">🛒 Your Shopping Cart</h2>

      <div className="bg-white rounded-lg shadow-lg p-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-indigo-600 font-bold">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => handleQtyChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.qty}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => handleQtyChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <p className="font-semibold">₹{item.price * item.qty}</p>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-6 text-lg font-bold">
              <span>Total:</span>
              <span className="text-indigo-700">₹{totalPrice}</span>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
