import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const [address, setAddress] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();
console.log(cart)
const userDetailsfromLocalstorage = localStorage.getItem('user');
  let userId = null;
  
  if (userDetailsfromLocalstorage) {
    try {
      const parsedUser = JSON.parse(userDetailsfromLocalstorage);
      userId = parsedUser.id;
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
    }
  }
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch(`http://localhost:3000/users/address/${userId}`);
        const data = await res.json();
        if (data?.address) {
          setAddress(data.address);
        }
      } catch (err) {
        console.error('Error fetching address:', err);
      }
    };

    fetchAddress();
  }, [userId]);

  const handlePlaceOrder = async () => {
    if (!address) {
      toast.error('Please add your address before placing the order.');
      return;
    }

    try {
      setIsPlacingOrder(true);
      const res = await fetch(`http://localhost:3000/orders/place/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cart, total_price: totalAmount }),
      });

      if (res.ok) {
        toast.success('Order placed successfully!');
        navigate('/shop');
      } else {
        toast.error('Failed to place order.');
        
      }
    } catch (err) {
      console.error('Error placing order:', err);
      toast.error('Something went wrong.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-3xl min-h-fit mx-auto p-4 bg-white shadow-lg rounded-md ">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
        {address ? (
          <p className="border p-2 py-4 rounded bg-gray-100">{address}</p>
        ) : (
          <p className="text-red-500">No address found. Please add one in your account page.</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Cart Items</h3>
        <ul className="divide-y  rounded-md">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between border border-gray-200 rounded-md shadow-md  items-center my-2 p-2">

              <div className='flex items-center gap-x-2'>
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
               <div> <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium mx-2">₹{item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium">Payment Method</h3>
        <div className="flex items-center mt-2">
          <input type="radio" checked readOnly className="mr-2" />
          <span>Cash on Delivery (COD)</span>
        </div>
        <p className="text-sm text-gray-500">Online Payment will be available soon.</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold">Total: ₹{totalAmount}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default CheckoutPage;
