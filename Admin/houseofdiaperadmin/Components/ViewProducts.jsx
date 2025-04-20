import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Trash, CheckSquare, Square } from 'lucide-react'; // For icons
import AdminLayout from './CommonLayout';

const ViewProducts = () => {
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

  
console.log(products)
  // Handle stock status toggle
  const handleStockToggle = async (productId, currentStockStatus) => {
    try {
      const updatedStockStatus = currentStockStatus ? 0 : 1; // Toggle between 1 (in stock) and 0 (out of stock)
      const response = await fetch(`http://localhost:3000/products/updateStockStatus/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inStock: updatedStockStatus }),
      });

      if (!response.ok) throw new Error('Failed to update stock status');
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, in_stock: updatedStockStatus }
            : product
        )
      );
      toast.success('Stock status updated');
    } catch (error) {
      toast.error('Error updating stock status');
    }
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/deleteproduct/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      toast.success('Product deleted');
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  return (
    <>
    <main className='flex gap-x-2'>
    <AdminLayout/>
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">View Products</h2>

      <table className="min-w-full table-auto  border shadow-md rounded-md border-red-200 border-collapse">
        <thead className='border border-gray-400 '>
          <tr >
            <th className="px-2 py-2 border border-gray-400 text-center  ">ID</th>
            <th className="px-2 py-2 border border-gray-400 text-center  ">Product Name</th>
            <th className="px-2 py-2 border border-gray-400 text-center  ">Image</th>
            <th className="px-2 py-2 border border-gray-400 text-center  ">Stock Status</th>
            <th className="px-2 py-2 border border-gray-400 text-center ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-2 py-2 border border-gray-400 text-center ">No products available</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className='border border-gray-400'>
                <td className="px-2 py-2 border border-gray-400 text-center">{product.id}</td>
                <td className="px-2 py-2 border border-gray-400 text-center">{product.product_name}</td>
                <td className="px-2 py-2 border border-gray-400 text-center">
                  <img
                    src={product.image} // Assuming the backend stores image URL
                    alt={product.productName}
                    className="w-16 h-16 object-cover mx-auto rounded-md"
                  />
                </td>
                <td className="px-2 py-2 border border-gray-400 text-center">
                  <button
                    onClick={() => handleStockToggle(product.id, product.in_stock)}
                    className={`px-2 py-2 w-fit  mx-auto flex items-center justify-center   rounded-md ${
                      product.in_stock ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}
                  >
                    {product.in_stock ? (
                      <CheckSquare size={18} />
                    ) : (
                      <Square size={18} />
                    )}
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </button>
                </td>
                <td className="px-2 py-2 border border-gray-400 text-center">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </main>
    </>
  );
};

export default ViewProducts;
