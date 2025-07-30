/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Persist to localStorage on every cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
   const exists = cartItems.find(item => item.id === product.id && item.selectedSize === product.selectedSize);
    if (exists) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(prev => [
        ...prev,
        { ...product, price: Number(product.price), quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (id, selectedSize) => {
  setCartItems(prev =>
    prev.filter(item => !(item.id === id && item.selectedSize === selectedSize))
  );
};


  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (id, selectedSize, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};
