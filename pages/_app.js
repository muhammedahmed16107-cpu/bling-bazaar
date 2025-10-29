import React, { createContext, useState } from "react";
import "../styles/globals.css";

export const CartContext = createContext();

export default function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const DELIVERY_CHARGE = 300;

  const addToCart = (product, variant) => {
    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.variant === variant
    );
    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          variant,
          quantity: 1,
          price: product.price,
          image: product.images[variant],
          description: product.description,
        },
      ]);
    }
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const changeQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) newCart[index].quantity = 1;
    setCart(newCart);
  };

  const applyDiscount = (code) => {
    if (code === "DTEN") {
      setDiscountApplied(true);
      setDiscountCode(code);
      return true;
    } else {
      setDiscountApplied(false);
      setDiscountCode("");
      return false;
    }
  };

  const totalProducts = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = discountApplied ? totalProducts * 0.1 : 0;
  const total = totalProducts - discount + DELIVERY_CHARGE;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        changeQuantity,
        discountCode,
        discountApplied,
        applyDiscount,
        totalProducts,
        discount,
        total,
        DELIVERY_CHARGE,
      }}
    >
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}