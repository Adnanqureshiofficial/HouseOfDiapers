import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import AdminLayout from './CommonLayout';

const categories = ['Diapers', 'Wipes', 'Skincare', 'Feeding Bottles', 'Clothing'];

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    size: '',
    inStock: false,
    image: null,
    category: '',  // New field for category
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.productName) validationErrors.productName = 'Product name is required';
    if (!formData.price) validationErrors.price = 'Price is required';
    if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) validationErrors.price = 'Invalid price format | valid format: 10, 10.0 10.00';
    if (!formData.size) validationErrors.size = 'Size is required';
    if (!formData.image) validationErrors.image = 'Product image is required';
    if (!formData.description || formData.description.trim().split(/\s+/).length < 10) {
      validationErrors.description = 'Description must be at least 10 words';
    }
    if (!formData.category) validationErrors.category = 'Category is required';  // Validate category

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
console.log(formData.category)
    setErrors({});

    try {
      const data = new FormData();
      data.append('productName', formData.productName);
      data.append('price', formData.price);
      data.append('size', formData.size);
      data.append('inStock', formData.inStock);
      data.append('image', formData.image);
      data.append('description', formData.description);
      data.append('category', formData.category);  // Add category to form data

      const response = await fetch('http://localhost:3000/products/addproduct', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        toast.success('Product added successfully!');
        setFormData({
          productName: '',
          price: '',
          description: '',
          size: '',
          inStock: false,
          image: null,
          category: '',  // Reset category field
        });
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      toast.error('There was an error adding the product. Please try again.');
    }
  };

  return (
    <>
    <main className='flex gap-x-2'>
    <AdminLayout/>
    <div className="container w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md outline-none focus:border-blue-500"
            placeholder="Enter product name"
          />
          {errors.productName && <p className="text-red-500 text-xs">{errors.productName}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md outline-none focus:border-blue-500"
            placeholder="Enter product description (minimum 10 words)"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md outline-none focus:border-blue-500"
            placeholder="Enter product price"
          />
          {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
        </div>

        {/* Size */}
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md outline-none focus:border-blue-500"
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          {errors.size && <p className="text-red-500 text-xs">{errors.size}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
        </div>

        {/* In Stock */}
        <div className="flex items-center my-4">
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            className="mr-2 transform scale-150"
          />
          <label htmlFor="inStock" className="text-base text-gray-700">In Stock</label>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-2 w-full border rounded-md p-1"
          />
          {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 transition-all flex justify-center items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </form>
    </div>
    </main>
    </>
  );
};

export default AddProduct;
