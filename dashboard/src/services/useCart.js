import { useState } from 'react';

export default function useCart() {
  const getCart = () => {
    const cartString = localStorage.getItem('cart');
    return cartString ? JSON.parse(cartString) : [];
  };
  const [cartStorage, setCartStorage] = useState(getCart());
  const addToCart = (value) => {
    const newCart = [...cartStorage, value];
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartStorage(newCart);
  };
  const removeFromCart = () => {
    localStorage.removeItem('cart');
    setCartStorage([]);
  };
  return {
    cartStorage,
    addToCart,
    removeFromCart
  };
}
