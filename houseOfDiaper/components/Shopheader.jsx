import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import { FaOpencart } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
const Shopheader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Shop Title */}
          <div className="flex items-center space-x-4">
            <img src="/images/logo.png" alt="Logo" className="h-12 w-12 rounded-3xl" /> {/* Replace with your logo */}
            <h1 className="text-2xl font-bold text-gray-800">House of Diaper</h1>
          </div>

          {/* Desktop Navbar Links */}
          <div className="hidden md:flex space-x-8">
          <Link to="/" className="block text-gray-800 flex items-center gap-1 hover:text-blue-500"><IoHomeOutline />Home</Link>
          
          <Link to="/login" className="block text-gray-800 flex items-center gap-1 hover:text-blue-500"><IoIosLogIn />Login</Link>
          <Link to="/cart" className="block text-gray-800 flex items-center gap-1 hover:text-blue-500"><FaOpencart />Cart</Link>
          <Link to="/accountpage" className="block text-gray-800 flex items-center gap-1 hover:text-blue-500"><VscAccount />
          Account</Link>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-800 hover:text-blue-500 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Links */}
        <div
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:hidden bg-white  mt-4 p-4 space-y-4 `}
        >
          <Link to="/" className="block text-gray-800 flex items-center gap-1 hover:bg-gray-500/30 rounded:sm  py-1 px-2  hover:text-blue-500"><IoHomeOutline />Home</Link>
          <Link to="/cart" className="block text-gray-800 flex items-center gap-1 hover:bg-gray-500/30 rounded:sm  py-1 px-2  hover:text-blue-500"><FaOpencart />Cart</Link>
          <Link to="/login" className="block text-gray-800 flex items-center gap-1 hover:bg-gray-500/30 rounded:sm  py-1 px-2  hover:text-blue-500"><IoIosLogIn />Login</Link>
          <Link to="/accountpage" className="block text-gray-800 flex items-center gap-1 hover:bg-gray-500/30 rounded:sm  py-1 px-2  hover:text-blue-500"><FaOpencart />
          Account</Link>
        </div>
      </div>
    </nav>
  );
};

export default Shopheader;
