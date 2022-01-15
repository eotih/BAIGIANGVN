/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import CartReducer from '../reducers/CartReducer';
import logger from '../logger';

const INITIAL_STATE = {
  cart: [],
  loading: true,
  status: null,
  message: null,
  error: null
};
const CartContext = createContext(INITIAL_STATE);
const CartContextProvider = ({ children }) => {
  const [state, dispatchCart] = useReducer(logger(CartReducer), INITIAL_STATE);
  const { cart, status, message, loading, error } = state;
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        status,
        message,
        error,
        dispatchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
