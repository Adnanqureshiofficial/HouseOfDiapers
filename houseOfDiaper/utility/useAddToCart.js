
import { toast } from "react-hot-toast";
import { useCart } from "../components/CartContext";

const useAddToCart = () => {
  const { cart, dispatch } = useCart();

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.find(item => item.id === product.id);

    if (alreadyInCart) {
      toast.success(`${product.title} is already in your cart`);
    } else {
      dispatch({
        type: "AddItems",
        payload: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
      });
      toast.success(`${product.title} added to cart`);
    }
  };

  return handleAddToCart;
};

export default useAddToCart;
