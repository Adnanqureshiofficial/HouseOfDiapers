import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from './footer';



const Login = ({setUser}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
const updateUser = () => {
  setUser(prev => !prev);
    console.log("reached")
}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { username, password } = formData;
    if (!username.trim()) {
      showError('Username is required');
      scrollToError('username');
      return false;
    }
    if (password.length < 6) {
      showError('Password must be at least 6 characters');
      scrollToError('password');
      return false;
    }
    return true;
  };

  const scrollToError = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const showError = (msg) => {
    toast.error(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

   
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include', 
      });
    
      const data = await response.json();
      
      // response successfull
      if (response.status === 200 && data.user) {
        
        toast.success('Login successful!');
        //store session info 
        localStorage.setItem('user', JSON.stringify(data.user)); 
         updateUser()
        navigate('/shop'); 
      } else {
        // Login failed, 
        showError(data.message || 'Login failed');
      }
    } catch (error) {
      showError('Server error');
      console.log(error)
    }
    
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen py-32 flex items-center justify-center bg-[url('/images/heroimg.jpg')] bg-cover bg-center relative" >
      <div className="absolute inset-0 bg-black/70 bg-opacity-30 "></div>

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

      <form onSubmit={handleSubmit} className="z-10 w-full max-w-md mx-4 p-8 rounded-2xl bg-white backdrop-blur-2xl shadow-2xl border border-white/30">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-black/70 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
          Welcome Back <span class='rotate-animation'>👋</span>
        </h1>

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-black/70 font-medium">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-black/70  border border-black/40 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent "
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-black/70 font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-black/70 placeholder-black/70 border border-black/40 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black/70 font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Login
        </button>

        <p className="mt-4 text-center text-black/70/90 text-sm">
          Don't have an account?{' '}
          <Link to="/Signup" className="text-pink-500 hover:text-black/70 font-semibold underline hover:underline-offset-2 transition">
            Sign up
          </Link>
        </p>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
