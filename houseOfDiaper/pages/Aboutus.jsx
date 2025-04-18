import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaStar, FaHeadset, FaTruck, FaUsers } from 'react-icons/fa';

const Aboutus = () => {
  return (
    <>
    <Navbar/>


    <div className="text-gray-800 pt-20">
      {/* Section 1 */}
      <section className="min-h-[70vh] md:pb-0 pb-8 flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-indigo-100 to-white px-6 md:px-20">
        <div className="md:w-1/2  mb-10 md:mb-0 md:text-left text-center ">
          <h2 className="text-3xl md:w-[70%]  mx-auto font-bold mb-4 text-indigo-700">Who We Are</h2>
          <p className="text-lg  md:w-[70%] mx-auto leading-relaxed text-gray-700">
            House Of Diapers is dedicated to providing high-quality diapers for babies, adults, and seniors. We blend care with comfort, ensuring every product supports hygiene, health, and happiness.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/images/about/about1.png" alt="About Us" className="max-w-[90%] rounded-xl shadow-xl hover:scale-105 transition-all duration-300" />
        </div>
      </section>

      {/* Section 2 with parallax background */}
      <section className="h-[70vh] bg-fixed bg-center bg-[url('/images/about/aboutbg.png')] bg-center bg-cover bg-no-repeat flex items-center px-6 md:px-20" >
        <div className="bg-white backdrop-blur-md bounce-infinite rounded-xl p-10 md:w-1/2 ml-auto shadow-lg hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Our mission is simple — make diapering easy, safe, and stress-free for every age group. We strive to deliver affordability without compromising on quality or comfort.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="min-h-[70vh] py-8 md:py-0 flex flex-col md:flex-row-reverse items-center justify-center bg-indigo-50 px-6 md:px-20">
        <div className="md:w-1/2 mb-10 mx-auto md:mb-0 md:text-left text-center">
          <div className='mx-auto w-fit'>
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
            <li className='flex items-center justify-center md:justify-start gap-2 '><FaStar className="text-indigo-600" /> Premium quality for all ages</li>
            <li className='flex items-center justify-center md:justify-start gap-2'><FaTruck className="text-indigo-600" />Reliable delivery across India</li>
            <li className='flex items-center justify-center md:justify-start gap-2'><FaHeadset className="text-indigo-600" />Responsive and caring customer support</li>
            <li className='flex items-center justify-center md:justify-start gap-2'><FaUsers className="text-indigo-600" /> Trusted by thousands of families</li>
          </ul>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/images/about/about2.png" alt="Why Choose Us" className="max-w-[90%] rounded-xl shadow-xl hover:scale-105 transition-all duration-300" />
        </div>
      </section>
      <section>

      </section>
    </div>
  
<Footer/>
    </>
  )
}

export default Aboutus