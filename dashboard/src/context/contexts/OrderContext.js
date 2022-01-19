/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import OrderReducer from '../reducers/OrderReducer';
import logger from '../logger';

const INITIAL_STATE = {
  order: [],
  loading: true,
  status: null,
  message: null,
  error: null
};
const OrderContext = createContext(INITIAL_STATE);
const OrderContextProvider = ({ children }) => {
  const [state, dispatchOrder] = useReducer(logger(OrderReducer), INITIAL_STATE);
  const { order, status, message, loading, error } = state;
  return (
    <OrderContext.Provider
      value={{
        order,
        loading,
        status,
        message,
        error,
        dispatchOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderContextProvider };
