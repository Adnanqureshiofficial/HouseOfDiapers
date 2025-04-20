import React, { useEffect, useState } from 'react';
import AdminLayout from './CommonLayout';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAdminOrders = async () => {
      try {
        const res = await fetch('http://localhost:3000/orders/admin/orders');
        const data = await res.json();
        setOrders(data);
        console.log(data)
      } catch (err) {
        console.error('Failed to fetch admin orders:', err);
      }
    };

    fetchAdminOrders();
  }, []);
console.log(orders)
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/orders/update-status/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.order_id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  return (
    <>
    <main  className='flex gap-x-2'>
    <AdminLayout/>
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Order Management</h1>

      {orders ? orders.map((order) => (
  <div key={order.order_id} className="border border-green-400 bg-green-300/30 hover:scale-102 transform-all duration-300 p-4 rounded-lg mb-5 shadow-md">
    <h2 className="text-xl font-semibold mb-2">🧾 Order ID: {order.order_id}</h2>

    <div className="mb-2">
      <strong className='mb-2'>Status:</strong><br/>
      <select
        value={order.status}
        onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
        className="text-white  p-1 rounded bg-green-500"
      >
        <option value="confirmed">Confirmed</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    <div className="mb-2">
      <strong>Order Total:</strong> ₹{order.total_price}
    </div>
    <div className="mb-2">
      <strong>Order Created At:</strong> {new Date(order.created_at).toLocaleString()}
    </div>
   

    <div className="mb-4">
      <h3 className="font-semibold">👤 User Info</h3>
      <div>Name: {order.user.name}</div>
      <div>Username: {order.user.username}</div>
      <div>Role: {order.user.role}</div>
      <div>Registered: {new Date(order.user.createdAt).toLocaleString()}</div>
      <a href={`tel:${order.user.phone}`} className="text-blue-500 underline mr-2">
        📞 {order.user.phone}
      </a>
      <a href={`mailto:${order.user.email}`} className="text-blue-500 underline">
        📧 {order.user.email}
      </a>
    </div>

    <div className="mb-4">
      <h3 className="font-semibold">📍 Address</h3>
      <div>{order.address.address || 'No Address'}</div>
    
    </div>

    <div>
      <h3 className="font-semibold">🛒 Items</h3>
      <ul className="list-disc ml-6 mt-1">
        {order.items.map((item, idx) => (
          <li key={idx}>
            Product ID: {item.product_id} - ₹{item.price} × {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  </div>

))
: <div className='border border-red-500 bg-red-300'> No orders recieved</div>
} 
    </div>
    </main>
    </>
  );
};

export default OrderManagementPage;
