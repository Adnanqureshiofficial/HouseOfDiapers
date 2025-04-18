import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TfiClose, TfiAlignRight } from "react-icons/tfi";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaReadme } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";

import { LuShoppingBag } from "react-icons/lu";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  return (
    <>
    
    <nav className="bg-[#8059f6] fixed w-full z-50 shadow-md">
      <div className="w-full mx-auto px-8 py-3">
        <div className="flex items-center justify-between">
          <div className='flex  gap-x-5 items-center'>
          <img src="images/logo.png" alt="house of diapers logo" className='rounded-full bg-transparent w-10 h-10 md:w-14 md:h-14 object-cover' />
          <a href="#" className="text-white text-lg md:text-2xl font-bold  font-serif">House Of Diapers</a>
          </div>
          {/* Hamburger Menu */}
          <button 
            className="lg:hidden text-white" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen? <TfiClose />: <TfiAlignRight />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link to='/' className="text-white hover:text-[#384959] flex items-center gap-1 transition duration-300"><IoHomeOutline />
            Home</Link>
            <Link to='/categories' className="text-white hover:text-[#384959] flex items-center gap-1 transition duration-300"> <BiCategory />
            Categories</Link>
            <Link to='/about' className="text-white hover:text-[#384959] flex items-center gap-1 transition duration-300"> <FaReadme />About Us</Link>
            <Link to='/shop' className="text-white hover:text-[#384959] flex items-center gap-1 transition duration-300"> <LuShoppingBag />Shop</Link>
            <Link
              to='/signup' 
              className=" py-2 px-4 rounded-full bg-white text-[#8059f6] flex items-center gap-1 hover:bg-white/40 hover:border-2 hover:border-white hover:text-white hover:text-[#384959] transition duration-300"
            ><IoIosLogIn />
              Signup
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
      
        
      </div>
      <div className={`md:hidden absolute w-full py-4 px-8 bg-[#8059f6] shadow-2xl ${isMobileMenuOpen ? 'opacity-100  z-50 transition-all duration-300' : 'opacity-0 z-40  pointer-events-none transition-all duration-300'}`}
>
        <Link to='/' className="text-white py-2 px-2 flex items-center gap-1 hover:bg-black/20 hover:rounded-sm transition duration-300"><IoHomeOutline />Home</Link>
            <Link to='/categories' className="text-white py-2 px-2  flex items-center gap-1 hover:rounded-sm hover:bg-black/20 transition-all duration-300"><BiCategory />Categories</Link>
            <Link to='/shop' className="text-white hover:rounded-sm hover:bg-black/20  py-2 px-2 flex items-center gap-1 transition duration-300"> <LuShoppingBag />Shop</Link>
            <Link to='/about' className="text-white flex items-center gap-1 py-2 px-2 hover:rounded-sm hover:bg-black/20 transition-all duration-300"><FaReadme />About Us</Link>
            <Link
              to='/signup' 
              className=" text-white hover:bg-black/20 flex items-center gap-1 hover:rounded-sm py-2  px-2"
            ><IoIosLogIn />
              Signup
            </Link>
        </div>
    </nav>
    

    </>
  );
}

export default Navbar;

