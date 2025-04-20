// pages/Shop.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ShopFilter from './ShopFilter';
import LoginPrompt from './LoginToProceed';



  
export default function ProductGrid({isLoggedIn, toggleDisplayPrompt, displayLoginPrompt }) {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/fetchproducts'); // API endpoint to fetch products
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  //filter logic
  const filteredProducts = products.filter((product) => {
    const matchCategory = !filters.category || product.category === filters.category;  // Assuming category is a part of product data
    const matchStock = !filters.stock || 
    (filters.stock === 'In Stock'
      ? product.in_stock === 1
      : filters.stock === 'Out of Stock'
      ? product.in_stock === 0
      : true)
    
    const matchPrice = !filters.price || product.price <= filters.price;
    const matchSize = !filters.size || product.size === filters.size;  // Assuming filters.size exists for size-based filtering
    
    return matchCategory && matchStock && matchPrice && matchSize;
  });

  return (
    <>
    <main className='md:flex'>
 <ShopFilter onFilterChange={setFilters} />
    <div className="min-h-screen bg-gradient-to-br w-full from-blue-100 to-pink-50 p-4">
      <h1 className="text-3xl font-bold text-center text-purple-800 bg-gray-300/40 rounded-md py-2 mb-6">Shop Baby Essentials</h1>
  

      <div className="grid gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredProducts.length > 0 ? (
  filteredProducts.map((product) => (
    <ProductCard 
      key={product.id} 
      product={product} 
      isLoggedIn={isLoggedIn} 
      displayLoginPrompt={displayLoginPrompt} 
      toggleDisplayPrompt={toggleDisplayPrompt} 
    />
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
