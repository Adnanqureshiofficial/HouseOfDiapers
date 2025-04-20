import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

 // For the routes after login
import LoginForm from '../Components/LoginPage';

import AddProduct from '../Components/AddProducts';
import { Toaster } from 'react-hot-toast';
import ViewProducts from '../Components/ViewProducts';
import OrderManagementPage from '../Components/OrderManaagement';
const App = () => {
  return (
    <>
    
    <Toaster
    position="bottom-center"
    toastOptions={{
      style: {
        marginBottom: '60px',
        background: '#1f2937', 
        color: '#fff',
        fontSize: '14px',
        padding: '12px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      },
    }}
  />
  
      <Routes>
        <Route path="/" element={<LoginForm />} /> 

       <Route path='/addproducts' element={<AddProduct/>}/>
      <Route path='/productlist' element={<ViewProducts/>}/>
      <Route path='/ordermanagement' element={<OrderManagementPage/>}/>
      
      
      </Routes>
      </>
  );
}

export default App;
