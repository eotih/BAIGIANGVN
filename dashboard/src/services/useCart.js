import { useState } from 'react';

export default function useCart() {
  const getCart = () => {
    const cartString = localStorage.getItem('cart');
    return cartString ? JSON.parse(cartString) : [];
  };
  const [cart, setCart] = useState(getCart());
  const addToCart = (value) => {
    const newCart = [...cart, value];
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };
  const removeFromCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };
  return {
    cart,
    addToCart,
    removeFromCart
  };
}
