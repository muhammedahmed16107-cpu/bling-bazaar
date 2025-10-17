import { useState } from 'react';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    payment: 'cod',
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

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

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData({ ...checkoutData, [name]: value });
  };

  const handleCheckoutSubmit = () => {
    if (!checkoutData.name || !checkoutData.email || !checkoutData.phone || !checkoutData.address) {
      alert('Please fill all fields.');
      return;
    }

    // Here you can send data to an API or database
    console.log('Order Details:', { cart, ...checkoutData });

    setOrderSuccess(true);
    setCart([]);
    setCheckoutData({ name: '', email: '', phone: '', address: '', payment: 'cod' });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#ffffff', color: '#000' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ color: 'gold' }}>Bling Bazaar</h1>
        <button onClick={() => setShowCart(!showCart)} style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
          🛒 ({cart.length})
        </button>
      </div>

      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {products.map((product, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', width: '220px', textAlign: 'center', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <img src={product.image} alt={product.name} width="200" height="200" />
            <h3>{product.name}</h3>
            <p>{product.price} PKR</p>
            <button onClick={() => addToCart(product)} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: 'gold', border: 'none', borderRadius: '4px' }}>
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
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{item.name} - {item.price} PKR</span>
              <button onClick={() => removeFromCart(idx)} style={{ cursor: 'pointer', color: 'red' }}>Remove</button>
            </div>
          ))}
          <h3>Total: {totalPrice} PKR</h3>

          {cart.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              {!orderSuccess ? (
                <>
                  <h3>Checkout</h3>
                  <input type="text" name="name" placeholder="Full Name" value={checkoutData.name} onChange={handleCheckoutChange} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '0.5rem' }} />
                  <input type="email" name="email" placeholder="Email" value={checkoutData.email} onChange={handleCheckoutChange} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '0.5rem' }} />
                  <input type="tel" name="phone" placeholder="Phone Number" value={checkoutData.phone} onChange={handleCheckoutChange} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '0.5rem' }} />
                  <textarea name="address" placeholder="Shipping Address" value={checkoutData.address} onChange={handleCheckoutChange} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '0.5rem' }} />
                  <select name="payment" value={checkoutData.payment} onChange={handleCheckoutChange} style={{ display: 'block', width: '100%', margin: '0.5rem 0', padding: '0.5rem' }}>
                    <option value="cod">Cash on Delivery</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="easypaisa">Easypaisa</option>
                  </select>
                  <button onClick={handleCheckoutSubmit} style={{ padding: '0.5rem 1rem', marginTop: '0.5rem', backgroundColor: 'gold', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                    Place Order
                  </button>
                </>
              ) : (
                <p style={{ color: 'green', fontWeight: 'bold' }}>Your order has been placed successfully!</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}