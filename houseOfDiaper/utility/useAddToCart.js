
import { toast } from "react-hot-toast";
import { useCart } from "../components/CartContext";

const useAddToCart = () => {
  const { cart, dispatch } = useCart();

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.find(item => item.item_id === product.id);
console.log(product)
    if (alreadyInCart) {
      toast.success(`${product.product_name} is already in your cart`);
    } else {
      dispatch({
        type: "AddItems",
        payload: {
          item_id: product.id,             // match item_id in fetched cart items
          name: product.product_name,      // match 'name'
          price: product.price,
          size: product.size || "",        // optional if you're supporting it
          image: product.image,
          quantity: 0,
        }
      });
      
      toast.success(`${product.product_name} added to cart`);
    }
  };

  return handleAddToCart;
};

export default useAddToCart;
