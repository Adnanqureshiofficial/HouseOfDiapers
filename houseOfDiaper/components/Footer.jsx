import React from 'react'
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    
    <>
    <footer className="bg-gradient-to-r from-[#c3dafe] to-white py-10">

    <div className="mt-10">
            <h5 className="text-2xl font-semibold text-indigo-500 mb-8 text-center ">Find Us Here</h5>
            <div className="w-full h">
                <iframe className="w-full h-72 border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.668444211118!2d72.82767327374565!3d19.383503842249823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7af50219324c5%3A0x71f52a65453ab117!2sHouse%20Of%20Diapers%20(VASAI)!5e0!3m2!1sen!2sin!4v1741026468576!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    <div className="flex  justify-center items-center mx-auto mt-5 min-h-60 px-2">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full justify-center items-center gap-20">
            {/* <!-- Shop Address Section --> */}
            <div className="text-center md:text-left">
                <h5 className="text-xl font-semibold md:mb-4 mb-2 mt-3 text-indigo-500">Shop Address</h5>
                <p className="text-gray-700">Shop no.19 Pendhari Building, Vasai Station Road, <br/> Next to Tungareshwar Sweets.<br/>Vasai West<br/>Maharashtra, 401202</p>
            </div>
            
            {/* <!-- Contact Section --> */}
            <div className="text-center md:text-left">
                <h5 className="text-xl font-semibold md:mb-4 mb-2 text-indigo-500">Contact Us</h5>
                <a href='tel:+8208852775' className="text-gray-700 hover:text-[#1D4ED8]">Phone: 9028910286</a>
            </div>
            
            {/* <!-- Social Media Links Section --> */}
            <div className="text-center md:text-left ">
                <h5 className="text-xl font-semibold md:mb-4 mb-2 text-indigo-500">Follow Us</h5>
                <a href="#" className="text-gray-700 hover:text-[#1D4ED8] flex gap-1 items-center md:justify-start justify-center  mr-3"><FaInstagram />
                Instagram</a>
                {/* <!-- Add other social media links as needed --> */}
            </div>
        </div>

    
        
    </div>
    
</footer>
<p className='bg-indigo-500 text-white text-center py-2'>&copy; 2023 House Of Diapers. All rights reserved.</p>
    </>
  )
}

export default Footer