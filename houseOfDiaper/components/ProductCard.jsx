import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import useAddToCart from '../utility/useAddToCart';
import LoginPrompt from './LoginToProceed';

export default function ProductCard({ product, isLoggedIn, toggleDisplayPrompt, displayLoginPrompt }) {
  // Default size selection (if size is available)

  const addToCart = useAddToCart();

  const handleClick = () => {
    if (isLoggedIn) {
      addToCart(product);
      console.log(product)
    } else {
      toggleDisplayPrompt();
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <>
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition duration-300 border border-white/20">
        <div className="overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mt-3 space-y-1">
          <h2 className="text-lg font-semibold text-gray-800">{product.product_name}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>

          <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-bold text-pink-600">₹{product.price}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                product.in_stock ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-700'
              }`}
            >
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Size Selection Dropdown */}
          {/* {product.size && (
            <div className="mt-2">
              <label htmlFor="size" className="block text-sm text-gray-700">Select Size</label>
              <select
                id="size"
                value={selectedSize}
                onChange={handleSizeChange}
                className="mt-1 block w-full bg-white border border-gray-300 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select size</option>
                {product.size.split(',').map((sizeOption, index) => (
                  <option key={index} value={sizeOption.trim()}>
                    {sizeOption.trim()}
                  </option>
                ))}
              </select>
            </div>
          )} */}
          <div className='text-sm py-2'>
           Available Size:  {product.size}
          </div>
{ product.in_stock?
          <button
            className="mt-3 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
            onClick={handleClick}
          >
            Add to Cart
          </button>:  <button
          disabled
            className="mt-3 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
            onClick={handleClick}
          >
            Add to Cart
          </button>}
        </div>
      </div>
    </>
  );
}
