// components/ShopFilter.jsx
import React, { useState } from 'react';
import { TfiClose, TfiAlignLeft } from "react-icons/tfi";

const categories = ['Diapers', 'Wipes', 'Skincare', 'Feeding Bottles', 'Clothing'];
const availability = ['In Stock', 'Out of Stock'];

export default function ShopFilter({ onFilterChange }) {
  const [selectedCategory, setCategory] = useState('');
  const [price, setPrice] = useState(500);
  const [stock, setStock] = useState('');

const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ category: selectedCategory, price, stock });
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(prevState => !prevState);
  };

  return (
    <>
    <div className='shadow-md bg-black/30 flex  md:hidden items-center px-4 py-2 gap-3 '>
  {isFilterMenuOpen?<TfiClose  onClick={toggleFilterMenu} />:<TfiAlignLeft className='md:hidden' onClick={toggleFilterMenu} />}  
      <h2 className="text-xl font-semibold  text-center text-gray-800">Filter Products</h2>
      </div>
    <form onSubmit={handleSubmit} className={`w-full ${isFilterMenuOpen ?"block":"hidden"} md:block md:static md:z-0 z-10 fixed  max-w-[250px] md:max-w-sm min-h-screen bg-white/30 backdrop-blur-md p-4 rounded-2xl shadow-xl sm:mt-0`}>
   
    <h2 className="text-xl font-semibold  text-center text-gray-800">Filter Products</h2>

      {/* Category */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Max Price: ₹{price}</label>
        <input
          type="range"
          min="100"
          max="3000"
          step="100"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Stock Availability */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Availability</label>
        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All</option>
          {availability.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 transition-colors text-white font-medium py-2 px-4 rounded-lg shadow-md"
      >
        Apply Filters
      </button>
    </form>
    </>
  );
}
