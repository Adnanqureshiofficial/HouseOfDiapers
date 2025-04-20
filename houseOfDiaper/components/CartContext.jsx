import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

// --- Initial setup ---
const CartContext = createContext();
const initialCurrentState = [];
const userDetails = localStorage.getItem('user');
let userId = null;

if (userDetails) {
  try {
    const parsedUser = JSON.parse(userDetails);
    userId = parsedUser.id;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
  }
}

// --- Reducer ---
function cartReducer(CurrentState, action) {
 
  switch (action.type) {
    case "initialize":
      console.log("initialize reached")
      return action.payload;

    case "AddItems":
      const existing = CurrentState.find(item => item.item_id === action.payload.item_id);
      if (existing) {
        return CurrentState.map(item =>
          item.item_id === action.payload.item_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...CurrentState, { ...action.payload, quantity: 1 }];

    case "increment":
      console.log(action.payload.item_id)
      return CurrentState.map(item =>
        item.item_id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "decrement":
      return CurrentState
        .map(item =>
          item.item_id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);

    case "delete":
      return CurrentState.filter(item => item.item_id !== action.payload);

    default:
      return CurrentState;
  }
}

export const CartProvider = ({ children, isLogged }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCurrentState);

  // Fetch cart on page load
  useEffect(() => {
    const fetchCartFromBackend = async () => {
      try {
        if (isLogged) {
          console.log("fetch cart reached")
          const response = await fetch(`http://localhost:3000/cart/fetch-cart/${userId}`, { credentials: 'include' });
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (data && Array.isArray(data.items)) {
              dispatch({ type: "initialize", payload: data.items });
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };


    fetchCartFromBackend();
  }, [isLogged]);


  // This function saves cart to backend when proceed to check out is clicked
  const saveCartToBackend = async () => {
    if (isLogged && cart.length > 0) {
      try {
        const response = await fetch(`http://localhost:3000/cart/update-cart/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ cartItems: cart }),
        });
  
        if (response.ok) {
          toast.success("Cart saved successfully");
          return true;
        } else {
          toast.error("Failed to save cart");
          return false;
        }
      } catch (error) {
        toast.error("Failed to update cart");
        return false;
      }
    }
    return false;
  };
  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      saveCartToBackend();  // Save cart explicitly with fetch
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [cart, isLogged]);

  return (
    <CartContext.Provider value={{ cart, dispatch, saveCartToBackend }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
