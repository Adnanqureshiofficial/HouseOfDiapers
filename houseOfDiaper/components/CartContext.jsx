import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialCurrentState = [];

function cartReducer(CurrentState, action) {
  switch (action.type) {
    case "AddItems":
      const existing = CurrentState.find(item => item.id === action.payload.id);
      if (existing) {
        return CurrentState.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...CurrentState, { ...action.payload, quantity: 1 }];

    case "increment":
      return CurrentState.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "decrement":
      return CurrentState
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);

    case "delete":
      return CurrentState.filter(item => item.id !== action.payload);

    default:
      return CurrentState;
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCurrentState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
