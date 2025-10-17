import { useState } from 'react';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const products = [
    { name: 'Airpods Master Copy White', price: 2399, image: '/images/airpodswhite.jpg' },
    { name: 'Airpods Master Copy Black', price: 2399, image: '/images/airpodsblack.jpg' },
    { name: 'A9 Airpods White', price: 2499, image: '/images/a9airpodswhite.jpg' },
    { name: 'A9 Airpods Black', price: 2499, image: '/images/a9airpodsblack.jpg' },
    { name: 'P9 Headphones White', price: 1799, image: '/images/p9-white.jpg' },
    { name: 'P9 Headphones Black', price: 1799, image: '/images/p9-black.jpg' },
    { name: 'P9 Headphones Blue', price: 1799, image: '/images/p9-blue.jpg' },
    { name: 'Arabic Aura Watch White', price: 1299, image: '/images/watch-white.jpg' },
    { name: 'Arabic Aura Watch White Tiger', price: 1299, image: '/images/watch-tiger.jpg' },
    { name: 'Arabic Aura Watch Black', price: 1299, image: '/images/watch-black.jpg' },
    { name: 'Gucci Ladies Watch', price: 3499, image: '/images/gucciladies.jpg' },
    { name: 'Rolex Sky Dweller', price: 3999, image: '/images/rolexskydweller.jpg' },
    { name: 'Patek Philippe Silicon Strap', price: 1999, image: '/images/patekphillipe.jpg' },
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'gold' }}>Bling Bazaar</h1>
        <button onClick={() => setShowCart(!showCart)} style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
          🛒 ({cart.length})
        </button>
      </div>

      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {products.map((product, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', width: '220px' }}>
            <img src={product.image} alt={product.name} width="200" height="200" />
            <h3>{product.name}</h3>
            <p>{product.price} PKR</p>
            <button onClick={() => addToCart(product)} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showCart && (
        <div style={{ marginTop: '2rem', borderTop: '2px solid gold', paddingTop: '1rem' }}>
          <h2>Cart</h2>
          {cart.length === 0 && <p>Your cart is empty.</p>}
          {cart.map((item, idx) => (
            <div key={idx}>
              {item.name} - {item.price} PKR <button onClick={() => removeFromCart(idx)}>Remove</button>
            </div>
          ))}
          <h3>Total: {totalPrice} PKR</h3>

          {cart.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h3>Checkout</h3>
              <p>Select Payment Method:</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <img src="/images/cod.png" width="60" height="40" alt="COD" />
                <img src="/images/easypaisa.png" width="60" height="40" alt="Easypaisa" />
                <img src="/images/creditcard.png" width="60" height="40" alt="Credit Card" />
              </div>
              <button style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'gold', cursor: 'pointer' }} onClick={() => alert('Checkout successful!')}>
                Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}