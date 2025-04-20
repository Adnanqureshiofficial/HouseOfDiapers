import { useCart } from "../components/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";


const CartItemCard = ({ product }) => {
  const { dispatch } = useCart();
  const { item_id, name, price, image, quantity, size } = product;
console.log(item_id)
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-300 shadow-md rounded-lg bg-white">
      <img src={image} alt={name} className="w-20 h-20 object-cover rounded-md" />
      
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">₹{price}</p>
        {size && <p className="text-xs text-gray-400">Size: {size}</p>}

        <div className="flex items-center gap-2 mt-2">
          {quantity > 1 ? (
            <button onClick={() => dispatch({ type: "decrement", payload: item_id })}>
              <FaMinus className="text-red-500" />
            </button>
          ) : (
            <button onClick={() => dispatch({ type: "delete", payload: item_id })}>
              <FaTrash className="text-red-500" />
            </button>
          )}
          <span className="px-3">{quantity}</span>
          <button onClick={() => {dispatch({ type: "increment", payload: item_id })
        console.log(`increment reached ${item_id}`)
        }}>
            <FaPlus className="text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
};



export default CartItemCard;
