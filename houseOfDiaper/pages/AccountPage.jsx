import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import AddressSection from '../components/AddressSection';

const AccountPage = () => {
  const [userDetails, setUserDetails] = useState(null);

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
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
  console.log(userDetails)
  
  
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return navigate('/login');
  
      try {
        const [userRes, ordersRes] = await Promise.all([
          fetch(`http://localhost:3000/users/getUserDetails/${userId}`),
          fetch(`http://localhost:3000/orders/getorders/${userId}`)
        ]);
  
        // Check for user fetch failure
        if (!userRes.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const userData = await userRes.json();
        setUserDetails(userData);
        console.log("User Data:", userData);
  
        // Handle orders fetch separately
        let ordersData = [];
        if (ordersRes.ok) {
          ordersData = await ordersRes.json();
        } else if (ordersRes.status !== 404) {
          throw new Error('Failed to fetch order data');
        }
  
        setOrders(() => ordersData);
        console.log("Orders Data:", ordersData);
  
      } catch (error) {
        console.error("Error fetching user or order data:", error);
        toast.error("Failed to load data. Please try again.");
      }
    };
  
    fetchData();
  }, [userId, navigate]);
  
 
  
console.log(orders)
//   const submitAddress = async () => {
//     try {
//       const res = await fetch(`/api/user/address/${userId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ address }),
//       });
//       if (res.ok) toast.success('Address saved successfully');
//       else toast.error('Failed to save address');
//     } catch (err) {
//       toast.error('Error saving address');
//     }
//   };

  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:3000/orders/cancelorder/${orderId}`, {
        method: 'PATCH',
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, is_deleted: true } : o));
        toast.success('Order cancelled');
      } else {
        toast.error('Failed to cancel order');
      }
    } catch (err) {
      toast.error('Error cancelling order');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>

      {userDetails && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">User Details</h2>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
        </div>
      )}

      <AddressSection/>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.order_id}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <p><strong>Order ID:</strong> {order.order_id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Price:</strong> ₹{order.total_price}</p>
                <p><strong>Items:</strong></p>
                <ul className="list-disc pl-5">
                  {order.items.map(item => (
                    <li key={item.product_id}>
                      {item.product_name} - ₹{item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
                {!order.is_deleted && (
                  <button onClick={() => cancelOrder(order.order_id)} className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
