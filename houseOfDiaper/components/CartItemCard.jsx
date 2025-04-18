import { useCart } from "../components/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartItemCard = ({ product }) => {
  const { dispatch } = useCart();
  const { id, title, price, image, quantity } = product;

  return (
    <div className="flex items-center gap-4 p-4 shadow-md rounded-lg bg-white">
      <img src={image} alt={title} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1 bg-red-500">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">₹{price}</p>
        <div className="flex bg-yellow-500 items-center gap-2 mt-2">
          {quantity > 1 ? (
            <button onClick={() => dispatch({ type: "decrement", payload: id })}>
              <FaMinus className="text-red-500" />
            </button>
          ) : (
            <button onClick={() => dispatch({ type: "delete", payload: id })}>
              <FaTrash className="text-red-500" />
            </button>
          )}
          <span className="px-3">{quantity}</span>
          <button onClick={() => dispatch({ type: "increment", payload: id })}>
            <FaPlus className="text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
