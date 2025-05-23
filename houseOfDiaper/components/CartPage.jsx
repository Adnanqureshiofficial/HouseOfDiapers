import { useCart } from "../components/CartContext";
import CartItemCard from "../components/CartItemCard";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, saveCartToBackend } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const navigate = useNavigate();

const handleProceed = async () => {
  const success = await saveCartToBackend();
  if (success) {
    navigate("/checkout");
  }
};
  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Your Cart</h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {cart.length === 0 ? (
        <div>
          <p className="text-center text-xl text-gray-600">Your cart is empty</p>
          <img src="/images/emptycart.png" alt="empty-cart" className="max-w-sm max-h-sm mix-blend-darken mx-auto" /></div>
        ) : (
          cart.map(product => <CartItemCard key={product.item_id} product={product} />)
        )}
      </div>

      {cart.length > 0 && (
        <div className="max-w-4xl border border-gray-300 mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
          <div className="flex justify-between text-xl font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button
            
            onClick={handleProceed}
            className="mt-4 inline-block cursor-pointer bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 text-center w-full"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
