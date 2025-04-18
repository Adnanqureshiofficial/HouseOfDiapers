import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation

const LoginPrompt = ({toggleDisplayPrompt, displayLoginPrompt}) => {
  const navigate = useNavigate();
  const [HideLoginPrompt, setHideLoginPrompt] = useState(false);
  // Handle the navigation to the login route
  const handleLogin = () => {
    navigate('/login');
  };
const onClose = ()=>{
    toggleDisplayPrompt((prevState) => !prevState);
}

  return (
    
    <div className={` w-full min-h-full absolute left-0 top-0 bg-black/10 bg-opacity-50 ${displayLoginPrompt ? "flex": "hidden"}  justify-center items-center z-10`}>
      <div className="bg-white p-6 rounded-lg shadow-xl relative w-64">
        <button 
          className="absolute top-2 right-2 text-lg font-bold text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        <p className="text-center text-gray-800 mb-4">Login to add items to cart</p>
        <button 
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={onClose}
        >
          <Link to={"/login"}> Login </Link>
        </button>
      </div>
    </div>
    
  );
};

export default LoginPrompt;
