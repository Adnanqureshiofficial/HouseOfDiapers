import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AddressSection = () => {
  const [address, setAddress] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [inputAddress, setInputAddress] = useState('');
  const userDetails = localStorage.getItem('user');
  let userId = null;
  
  if (userDetails) {
    try {
      const parsedUser = JSON.parse(userDetails);
      userId = parsedUser.id;
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
    }
  }
  
  useEffect(() => {
    if (!userId) return;
    // Fetch user's address from backend
    const fetchAddress = async () => {
      try {
        const res = await fetch(`http://localhost:3000/users/address/${userId}`);
        const data = await res.json();
        if (data?.address) setAddress(data.address);
      } catch (err) {
        console.error("Error fetching address:", err);
      }
    };
    fetchAddress();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/update-user-address/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: inputAddress }),
      });

      if (res.ok) {
        setAddress(inputAddress);
        setShowForm(false);
        toast.success("address updated successfully")
      }
    } catch (err) {
      console.error("Failed to save address:", err);
    }
  };

  return (
    <section className="bg-white p-4 rounded-md shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">Address Details</h2>
      {address ? (
        <div className="flex justify-between items-start flex-wrap gap-2">
          <p className="text-gray-700">{address}</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Edit Address
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-gray-500">No address found</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Add Address
          </button>
        </div>
      )}

      {showForm && (
        <div className="mt-4 bg-gray-50 p-4 rounded border">
          <textarea
            className="w-full border rounded-md p-2 mb-2"
            rows="4"
            placeholder="Enter your address"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
          ></textarea>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save Address
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddressSection;
