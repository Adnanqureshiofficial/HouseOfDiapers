import FeaturedProduct from './FeaturedProduct';


const FeaturedProductSection = () => {
  const products = [
    {
      image: '/images/heroimg1.jpg',
      title: 'Mamy Poko Pants All Night',
      price: '399',
      offerPrice: '280',
    },
    {
      image: '/images/heroimg2.jpg',
      title: 'Pampers Premium Care Diapers',
      price: '499',
      offerPrice: '350',
    },
    {
      image: '/images/heroimg3.jpg',
      title: 'Huggies Dry Pants',
      price: '420',
      offerPrice: '300',
    },
 
  ];

  return (
    <div className="max-w-screen-xl px-10  py-10 bg-transparent to-white  mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-indigo-600 text-center font-quicksand">Featured Products</h2>
      <div className="flex flex-wrap ">
        {products.map((product, index) => (
          <FeaturedProduct
            key={index}
            image={product.image}
            title={product.title}
            price={product.price}
            offerPrice={product.offerPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductSection;
