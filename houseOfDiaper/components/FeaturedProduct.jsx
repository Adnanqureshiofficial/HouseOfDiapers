const FeaturedProduct = ({ image, title, price, offerPrice }) => {
    return (

      <div className="w-full  md:w-1/3 px-4 mb-6 ">
        <div className="rounded-lg bg-white border-gray-200 shadow-md hover:scale-105 overflow-hidden hover:shadow-xl transition-all duration-300">
          <img
            src={image}
            alt={title}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h5 className="text-lg font-semibold mb-2">{title}</h5>
            <p className="text-gray-600 mb-2 line-through">MRP ₹{price}</p>
            <p className="text-green-600 font-semibold mb-4">Offer Price ₹{offerPrice}</p>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default FeaturedProduct;
  