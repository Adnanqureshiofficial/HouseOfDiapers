// pages/Shop.jsx
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ShopFilter from './ShopFilter';
import LoginPrompt from './LoginToProceed';


const dummyProducts = [
  {
    id: 1,
    title: 'Soft Baby Diapers',
    category: 'Diapers',
    image: '/images/heroimg1.jpg',
    price: 499,
    rating: 4,
    inStock: true,
  },
  {
    id: 2,
    title: 'Baby Wipes Combo',
    category: 'Wipes',
    image: '/images/heroimg1.jpg',
    price: 299,
   
    inStock: false,
  },
  // Add more products...
];
//check if user is logged to allow add to cart

  
export default function ProductGrid({isLoggedIn, toggleDisplayPrompt, displayLoginPrompt }) {
  const [filters, setFilters] = useState({});

  const filteredProducts = dummyProducts.filter((product) => {
    const matchCategory = !filters.category || product.category === filters.category;
    const matchStock = !filters.stock || 
      (filters.stock === 'In Stock' ? product.inStock : !product.inStock);
    const matchPrice = !filters.price || product.price <= filters.price;
    
    return matchCategory && matchStock && matchPrice;
  });

  return (
    <>
    <main className='md:flex'>
 <ShopFilter onFilterChange={setFilters} />
    <div className="min-h-screen bg-gradient-to-br w-full from-blue-100 to-pink-50 p-4">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">Shop Baby Essentials</h1>
  

      <div className="grid gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} isLoggedIn = {isLoggedIn} displayLoginPrompt= {displayLoginPrompt} toggleDisplayPrompt={toggleDisplayPrompt} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No products match your filters.</p>
        )}
      </div>
    </div>
    </main>
    
    <LoginPrompt toggleDisplayPrompt ={toggleDisplayPrompt} displayLoginPrompt={displayLoginPrompt}/>
    
    </>
  );
}
