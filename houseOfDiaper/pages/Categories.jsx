import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';


const Categories = () => {
 

const categories = [
  {
    title: "Baby Diapers",
    subtitle: "Soft. Absorbent. Gentle on baby skin.",
    description: "Explore our premium range for newborns to toddlers with all-day leak protection.",
    image: "/images/heroimgbd.jpg", // Replace with actual path
    link: "/categories/baby-diapers",
  },
  {
    title: "Adult Diapers",
    subtitle: "Comfort and dignity for adults.",
    description: "Discreet, absorbent, and breathable adult diapers for maximum comfort and care.",
    image: "/images/heroimgad.jpg",
    link: "/categories/adult-diapers",
  },
  {
    title: "Other Products",
    subtitle: "Wipes, creams & more.",
    description: "Find essentials like wipes, rash creams, and accessories for easier diapering.",
    image: "/images/heroimgbp.jpg",
    link: "/categories/other-products",
  },
];

  return (
    <>
   <Navbar/>
{/* hero section */}

<section className="relative  bg-fixed  bg-cover  bg-[url('/images/heroimg.jpg')] bg-center min-h-[70vh]">
  <div className="absolute inset-0 bg-black opacity-40"></div>
  <div className="relative z-10 text-center text-white  px-6 py-40 md:py-52">
    <h1 className="md:text-5xl text-3xl font-extrabold mb-4">Explore Our Diaper Categories</h1>
    <p className="text-lg mb-6 max-w-2xl mx-auto">
      Discover the best options for your needs, whether you're looking for baby diapers, adult diapers, or clearance products.
    </p>
    <Link to={'/shop'} class="bg-indigo-600 text-white py-2 px-6 rounded-full text-xl font-semibold hover:bg-indigo-700 transition-all duration-300">
      Shop Now
    </Link>
  </div>
</section>

{/* hero end */}
    <section className="py-16 ">
  <div className="container mx-auto ">
    {/* <!-- Section Title --> */}
    <h2 className="text-4xl font-extrabold text-indigo-800 text-center mb-12">Explore Our Diaper Categories</h2>

    {/* <!-- Category Cards --> */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

      {/* <!-- Category 1: Baby Diapers --> */}
      <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="mb-6">
          <img src="/images/heroimgbd.jpg" alt="Baby Diapers" className="w-full h-64 object-cover rounded-md mb-4"/>
        </div>
        <h3 className="text-3xl font-semibold text-indigo-700 mb-4">Baby Diapers</h3>
        <p className="text-lg text-gray-700 mb-6">
          Our baby diapers provide ultimate comfort and leak protection, ensuring your baby stays dry and happy all day.
        </p>
        <Link to={'/shop'} className="text-indigo-600 font-bold hover:underline">Explore Baby Diapers</Link>
      </div>

      {/* <!-- Category 2: Adult Diapers --> */}
      <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="mb-6">
          <img src="/images/heroimgad.jpg" alt="Adult Diapers" className="w-full h-64 object-cover rounded-md mb-4 "/>
        </div>
        <h3 className="text-3xl font-semibold text-indigo-700 mb-4">Adult Diapers</h3>
        <p className="text-lg text-gray-700 mb-6">
          Designed for adults, our diapers provide comfort and dignity, offering reliable protection for those in need.
        </p>
        <Link to={'/shop'} className="text-indigo-600 font-bold hover:underline">Explore Adult Diapers</Link>
      </div>

      {/* <!-- Category 3: Old Products --> */}
      <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="mb-6">
          <img src="/images/heroimgbp.jpg" alt="Old Products" className="w-full h-64 object-cover rounded-md mb-4" />
        </div>
        <h3 className="text-3xl font-semibold text-indigo-700 mb-4">Other Products</h3>
        <p className="text-lg text-gray-700 mb-6">
          Discover our range of discontinued or clearance diapers at affordable prices. Great deals, limited stock!
        </p>
        <Link to={'/shop'} className="text-indigo-600 font-bold hover:underline">Explore Other Products</Link>
      </div>
      
    </div>
  </div>
</section>


    {/* section on how to do diapers */}
    <section className="py-16 bg-gradient-to-r from-blue-100 to-white">
  <div className="container mx-auto px-6">
    {/* <!-- Section Title --> */}
    <h2 className="text-4xl font-extrabold text-blue-800 text-center mb-10">How to Use Diapers: A Step-by-Step Guide</h2>
    
    {/* <!-- Introduction Paragraph --> */}
    <p className="text-xl text-gray-700 text-center mb-8">
      Diapering is one of the most important tasks for parents and caregivers. Learn the essential steps and tips for using diapers effectively to keep your baby comfortable and healthy.
    </p>
    
    {/* <!-- Step-by-Step Diapering Guide --> */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {/* <!-- Step 1 --> */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-200 rounded-full flex justify-center items-center mr-4">
            <span className="text-xl text-blue-800">1</span>
          </div>
          <h3 className="text-2xl font-semibold text-blue-700">Choose the Right Size</h3>
        </div>
        <p className="text-gray-600">
          Ensure you select the right diaper size based on your baby's weight and age. This prevents discomfort and leakage.
        </p>
      </div>
      
      {/* <!-- Step 2 --> */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-200 rounded-full flex justify-center items-center mr-4">
            <span className="text-xl text-blue-800">2</span>
          </div>
          <h3 className="text-2xl font-semibold text-blue-700">Position the Diaper</h3>
        </div>
        <p className="text-gray-600">
          Lay the diaper flat under your baby, ensuring the back reaches the waistline and the front covers the abdomen.
        </p>
      </div>
      
      {/* <!-- Step 3 --> */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-200 rounded-full flex justify-center items-center mr-4">
            <span className="text-xl text-blue-800">3</span>
          </div>
          <h3 className="text-2xl font-semibold text-blue-700">Secure the Tabs</h3>
        </div>
        <p className="text-gray-600">
          Fasten the diaper using the adhesive tabs, making sure it's snug yet comfortable around the waist and thighs.
        </p>
      </div>
    </div>

    {/* <!-- Extra Tips Section --> */}
    <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-blue-800 mb-6">Extra Diapering Tips</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-4">
        <li>Always check for leaks and change the diaper as soon as it's soiled to keep your baby dry and happy.</li>
        <li>Consider using eco-friendly, biodegradable diapers to reduce environmental impact.</li>
        <li>Use a gentle diaper cream to prevent skin irritation and rashes.</li>
        <li>Monitor your baby's skin for signs of discomfort and adjust diaper brand if necessary.</li>
        <li>Dispose of used diapers hygienically in a diaper bin or biodegradable bags.</li>
      </ul>
    </div>
  </div>
</section>

<Footer/>
</>

  )
}

export default Categories