import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const products = [
    { name: "A9 AIRPODS", price: 2599, image: "/a9-airpods.jpg" },
    { name: "P9 HEADPHONES", price: 1999, image: "/p9-headphones.jpg" },
    { name: "ARABIC AURA WATCH", price: 1249, image: "/arabic-aura-watch.jpg" },
    { name: "AIRPODS MASTERCOPY", price: 2499, image: "/airpods-mastercopy.jpg" },
  ];

  const addToCart = (product) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[product.name]) newCart[product.name].quantity += 1;
      else newCart[product.name] = { price: product.price, quantity: 1 };
      return newCart;
    });
  };

  const removeFromCart = (name) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[name];
      return newCart;
    });
  };

  const changeQuantity = (name, delta) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (!newCart[name]) return newCart;
      newCart[name].quantity += delta;
      if (newCart[name].quantity <= 0) delete newCart[name];
      return newCart;
    });
  };

  const totalItems = Object.values(cartItems).reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = Object.values(cartItems).reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handlePayment = (method) => {
    alert({method});
  };

  return (
    <div className="container">
      {/* Logo */}
      <div className="logo-wrapper">
        <h1 className="logo">BLING BAZAAR</h1>
      </div>

      {/* Cart */}
      <div className="cart-icon-wrapper" onClick={() => setCartOpen(!cartOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#D4AF37" viewBox="0 0 24 24" width="32" height="32">
          <path d="M7 4h-2l-3 9v2h2l3-9zm16 0h-16l-1 3h14l2-3zm-3 8h-10v2h10v-2zm0 4h-10v2h10v-2z" />
        </svg>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </div>

      {cartOpen && (
        <div className="cart-panel">
          <h3>Shopping Cart</h3>
          {totalItems === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            Object.keys(cartItems).map((name) => {
              const item = cartItems[name];
              return (
                <div key={name} className="cart-item">
                  <Image src={products.find(p => p.name === name).image} alt={name} width={50} height={50} />
                  <span>{name}</span>
                  <span>
                    <button onClick={() => changeQuantity(name, -1)}>-</button>
                    <span style={{ margin: "0 5px" }}>{item.quantity}</span>
                    <button onClick={() => changeQuantity(name, 1)}>+</button>
                  </span>
                  <span>PKR {item.price * item.quantity}</span>
                  <button className="remove" onClick={() => removeFromCart(name)}>x</button>
                </div>
              );
            })
          )}
          {totalItems > 0 && (
            <>
              <p className="total">Total: PKR {totalPrice}</p>
              <button className="checkout-btn" onClick={() => setCheckoutOpen(true)}>Checkout</button>
            </>
          )}
        </div>
      )}

      {/* Checkout modal */}
      {checkoutOpen && (
        <div className="checkout-modal">
          <div className="checkout-content">
            <h2>Checkout</h2>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: PKR {totalPrice}</p>
            <h3>Payment Method</h3>
            <div className="payment-options">
              <button onClick={() => handlePayment("COD")}>
                <Image src="/cod.png" alt="Cash on Delivery" width={80} height={40} />
              </button>
              <button onClick={() => handlePayment("Card")}>
                <Image src="/creditcard.png" alt="Credit Card" width={80} height={40} />
              </button>
              <button onClick={() => handlePayment("EasyPaisa")}>
                <Image src="/easypaisa.png" alt="EasyPaisa" width={80} height={40} />
              </button>
            </div>
            <button className="close" onClick={() => setCheckoutOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <p className="tagline">Luxurious Gadgets, Watches & Accessories — Curated For You</p>

      {/* Products */}
      <div className="products">
        {products.map((p, i) => (
          <div key={i} className="card">
            <Image src={p.image} alt={p.name} width={220} height={220} style={{ borderRadius: "15px" }} />
            <h3>{p.name}</h3>
            <p>PKR {p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container { font-family: "Segoe UI, Roboto, sans-serif"; padding: 60px 20px; text-align: center; }
        .logo { font-size: 72px; font-weight: 900; color: #D4AF37; margin-bottom: 50px; }
        .cart-icon-wrapper { position: absolute; top: 40px; right: 40px; cursor: pointer; }
        .cart-badge { background: #D4AF37; color: #fff; border-radius: 50%; padding: 4px 8px; position: absolute; top: -10px; right: -10px; font-weight: bold; }
        .cart-panel { position: fixed; top: 60px; right: 20px; width: 360px; background: #fff; border-radius: 15px; padding: 25px; box-shadow: 0 8px 30px rgba(0,0,0,0.25); z-index: 1000; }
        .cart-item { display: flex; align-items: center; gap: 10px; justify-content: space-between; margin-bottom: 12px; }
        .cart-item button { background: none; border: 1px solid #ccc; border-radius: 4px; padding: 2px 8px; cursor: pointer; }
        .checkout-btn { width: 100%; padding: 12px; background: #D4AF37; color: #fff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; margin-top: 15px; }
        .products { display: flex; justify-content: center; flex-wrap: wrap; gap: 40px; margin-top: 50px; }
        .card { background: #fff; border-radius: 20px; box-shadow: 0 12px 35px rgba(0,0,0,0.15); padding: 20px; width: 250px; transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; }
        .card:hover { transform: translateY(-8px); box-shadow: 0 15px 50px rgba(0,0,0,0.25); }
        .checkout-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 1100; }
        .checkout-content { background: #fff; padding: 30px; border-radius: 20px; width: 400px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.25); }
        .payment-options button { margin: 5px; padding: 5px; border: none; background: none; cursor: pointer; }
        .tagline { margin-top: 50px; font-size: 22px; font-weight: 600; text-transform: uppercase; }
      `}</style>
    </div>
  );
}