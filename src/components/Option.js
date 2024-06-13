import React, { useState } from "react";
import { Link } from "react-router-dom";

const Option = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="block px-4 py-2 rounded-lg shadow-lg transition duration-300  focus:outline-none"
      >
        Options
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <div className="py-1">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Form
            </Link>
            <Link
              to="/data"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Data
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Option;
