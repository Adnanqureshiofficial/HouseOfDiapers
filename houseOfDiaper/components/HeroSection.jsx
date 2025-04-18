

const HeroSection = () => {
  return (
    <div className="relative  h-screen w-full bg-[url('/images/heroimg.jpg')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to House Of Diapers
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your one-stop destination for all your diapering needs.
        </p>
        <a
          to="/shop"
          className="bg-green-500 bounce-infinite hover:bg-green-600 pointer-events-auto cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
