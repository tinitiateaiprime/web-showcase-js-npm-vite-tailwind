import { useState, useEffect } from "react";

const HiddenButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle menu
  const hiddenMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".hidden-menu")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded" 
        onClick={hiddenMenu}
      >
         hiddenMenu
      </button>

      {/* Hidden Menu */}
      {isOpen && (
        <div className="hidden-menu absolute top-12 left-0 bg-gray-700 text-white p-4 rounded shadow-lg">
          <ul>
            <li className="py-1">Option 1</li>
            <li className="py-1">Option 2</li>
            <li className="py-1">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HiddenButton;
