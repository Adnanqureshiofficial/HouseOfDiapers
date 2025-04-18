import React, { useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
const navigate = useNavigate()
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToError = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const validate = () => {
    const { name, username, email, phone, password, confirmPassword } = formData;
    if (!name.trim()) {
      toast.error("Full name is required");
      scrollToError("name");
      return false;
    }
    if (!username.trim()) {
      toast.error("Username is required");
      scrollToError("username");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      scrollToError("email");
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be 10 digits");
      scrollToError("phone");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      scrollToError("password");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      scrollToError("confirmPassword");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({name : formData.name, username :  formData.username, email : formData.email, phone : formData.phone , password : formData.password}),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful!");
        navigate('/login')
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>

    <Navbar/>
    <div
      className="min-h-screen py-40 bg-cover max-w-full bg-[url('/images/about/loginbg.png')]  bg-center relative flex items-center justify-center px-4"
     
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="z-10 w-full max-w-xl bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30 space-y-5"
      >
       <h1 className="text-3xl sm:text-3xl font-bold bounce-infinite text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-500 drop-shadow-[0_2px_12px_rgba(255,0,120,0.5)]">
  👶Sign Up
</h1>

        {[
          { id: "name", label: "Full Name", type: "text" },
          { id: "username", label: "Username", type: "text" },
          { id: "email", label: "Email", type: "email" },
          { id: "phone", label: "Phone Number", type: "text" },
          { id: "password", label: "Password", type: "password" },
          { id: "confirmPassword", label: "Confirm Password", type: "password" },
        ].map(({ id, label, type }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-800">
              {label}
            </label>
            <input
              id={id}
              name={id}
              type={type}
              value={formData[id]}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-white/60 border-gray-300 rounded-lg focus:outline-none border  outline-indigo-500 focus:border-white  transition shadow-sm"
              placeholder={label}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Create Account
        </button>
        <p className="mt-4 text-center text-black/90 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-500  hover:text-indigo-600 text-base underline hover:underline-offset-2">
            Login
          </Link>
        </p>
      </form>
    
    </div>
    <Footer/>
    </>
  );
};

export default SignUp;
