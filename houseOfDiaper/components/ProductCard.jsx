// components/ProductCard.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';
import useAddToCart from '../utility/useAddToCart';
import LoginPrompt from './LoginToProceed';

export default function ProductCard({ product, isLoggedIn , toggleDisplayPrompt, displayLoginPrompt }) {

  const addToCart = useAddToCart();

  const handleClick = () => {
    if (isLoggedIn) {
    
    addToCart(product);
  }else{
    toggleDisplayPrompt()
  }
  };
  return (
    <>
    <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition duration-300 border border-white/20">
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="mt-3 space-y-1">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.category}</p>

       
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-pink-600">₹{product.price}</span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              product.inStock ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-700'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <button
          className="mt-3 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
          onClick={handleClick}
       >
          Add to Cart
        </button>
      </div>
    </div>
   
    </>
  );
}
