// pages/index.js
import React, { useState } from "react";

export default function Home() {
  const products = [
    { name: "A9 AirPods", category: "Mobile Accessories", price: 2499, description: "High-quality wireless earbuds with crystal clear sound.", colors: [{ name: "Black", image: "/images/a9airpodsblack.jpg" }, { name: "White", image: "/images/a9airpodswhite.jpg" }] },
    { name: "P9 Headphones", category: "Mobile Accessories", price: 1799, description: "Comfortable over-ear headphones with deep bass.", colors: [{ name: "Black", image: "/images/p9-black.jpg" }, { name: "White", image: "/images/p9-white.jpg" }, { name: "Blue", image: "/images/p9-blue.jpg" }] },
    { name: "AirPods Pro Mastercopy", category: "Mobile Accessories", price: 2499, description: "Noise-cancelling wireless earbuds with premium sound.", colors: [{ name: "Black", image: "/images/airpodsblack.jpg" }, { name: "White", image: "/images/airpodswhite.jpg" }] },
    { name: "Arabic Aura", category: "Watches", price: 1599, description: "Stylish watch with multiple strap colors and elegant design.", colors: [{ name: "Tiger", image: "/images/watch-tiger.jpg" }, { name: "White", image: "/images/watch-white.jpg" }, { name: "Black", image: "/images/watch-black.jpg" }] },
    { name: "Gucci Ladies", category: "Watches", price: 3499, description: "Luxury ladies watch with timeless design.", colors: [{ name: "", image: "/images/gucciladies.jpg" }] },
    { name: "Patek Philippe", category: "Watches", price: 1999, description: "Classic watch with elegant rubber strap.", colors: [{ name: "Rubber Strap", image: "/images/patekphillipe.jpg" }] },
    { name: "Rolex Sky Dweller", category: "Watches", price: 3699, description: "Premium watch with sophisticated design for collectors.", colors: [{ name: "", image: "/images/rolexskydweller.jpg" }] },
  ];

  const categories = ["Mobile Accessories", "Watches"];
  const bestSellers = [products[0], products[2], products[3], products[4]];

  const cities = [
    "Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar",
    "Quetta","Sialkot","Gujranwala","Hyderabad","Sukkur","Bahawalpur","Abbottabad",
    "Mardan","Chiniot","Kasur","Sheikhupura","Sahiwal","Okara","Rahim Yar Khan","Dera Ghazi Khan"
  ];

  const [selectedColors, setSelectedColors] = useState({});
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const DELIVERY_CHARGE = 300;

  const handleColorChange = (productName, colorName) => {
    setSelectedColors({ ...selectedColors, [productName]: colorName });
  };

  const addToCart = (product) => {
    const colorName = selectedColors[product.name] || product.colors[0].name;
    const colorObj = product.colors.find((c) => c.name === colorName);
    const existingIndex = cart.findIndex(
      (item) => item.name === product.name && item.selectedColor === colorName
    );

    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([
        ...cart,
        {
          name: product.name,
          price: product.price,
          image: colorObj.image,
          selectedColor: colorObj.name,
          quantity: 1,
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

  const totalProducts = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = discountApplied ? totalProducts * 0.1 : 0;
  const total = totalProducts - discount + DELIVERY_CHARGE;

  const applyDiscount = () => {
    if (discountCode === "DTEN") {
      setDiscountApplied(true);
      alert("✅ Discount applied successfully!");
    } else {
      alert("❌ Invalid discount code");
      setDiscountApplied(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append(
      "order",
      cart
        .map(
          (item) =>
            `${item.name} (${item.selectedColor}) x${item.quantity} - Rs ${
              item.price * item.quantity
            }`
        )
        .join("\n")
    );
    formData.append("totalProducts", "Rs " + totalProducts);
    formData.append("discount", discountApplied ? "-Rs " + discount : "No discount");
    formData.append("deliveryCharge", "Rs " + DELIVERY_CHARGE);
    formData.append("finalTotal", "Rs " + total);
    formData.append("deliveryCity", selectedCity);

    const response = await fetch("https://formspree.io/f/xanpvvyz", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setOrderPlaced(true);
      setCart([]);
      setDiscountCode("");
      setDiscountApplied(false);
    } else {
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fff", color: "#000" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 10, flexWrap: "wrap" }}>
        <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: "48px", color: "#A67D50", fontWeight: "bold" }}>
          BLING BAZAAR
        </div>
        <div style={{ cursor: "pointer", position: "relative", marginTop: "10px" }} onClick={() => setCartOpen(!cartOpen)}>
          <span style={{ fontSize: "28px" }}>🛒</span>
          {cart.length > 0 && (
            <span style={{ position: "absolute", top: "-5px", right: "-10px", backgroundColor: "#FFD700", borderRadius: "50%", padding: "2px 6px", fontSize: "12px", fontWeight: "bold" }}>
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </div>
      </header>

      {/* Hero */}
      <section style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "40px 20px", backgroundColor: "#f5f5f5" }}>
        <img src="/images/rolexskydweller.jpg" alt="Rolex Sky Dweller" style={{ maxWidth: "400px", width: "100%", borderRadius: "10px" }} />
        <img src="/images/a9airpodsblack.jpg" alt="A9 AirPods" style={{ maxWidth: "400px", width: "100%", borderRadius: "10px" }} />
      </section>

      {/* Best Sellers & Categories */}
      {[{ title: "Best Sellers", items: bestSellers }, ...categories.map(cat => ({ title: cat, items: products.filter(p => p.category === cat) }))].map((section, idx) => (
        <section key={idx} style={{ padding: "40px 20px" }}>
          <h2 style={{ fontSize: "28px", borderBottom: "2px solid #eee", display: "inline-block" }}>{section.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px", marginTop: "20px" }}>
            {section.items.map((product, i) => (
              <div key={i} style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "15px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <img src={selectedColors[product.name] ? product.colors.find(c => c.name === selectedColors[product.name]).image : product.colors[0].image} alt={product.name} style={{ maxWidth: "100%", borderRadius: "10px" }} />
                <h3>{product.name}</h3>
                <p style={{ fontStyle: "italic", fontSize: "13px" }}>{product.description}</p>
                <p>Rs {product.price}</p>
                {product.colors.length > 1 && product.colors.map(color => (
                  <button key={color.name} onClick={() => handleColorChange(product.name, color.name)} style={{ margin: "3px", border: selectedColors[product.name] === color.name ? "2px solid #000" : "1px solid #ccc", backgroundColor: "#fff", borderRadius: "5px", cursor: "pointer" }}>{color.name}</button>
                ))}
                <button onClick={() => addToCart(product)} style={{ backgroundColor: "#ff0000", color: "#fff", border: "none", borderRadius: "5px", padding: "10px 16px", cursor: "pointer", marginTop: "10px" }}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Cart Panel */}
      {cartOpen && (
        <div style={{ position: "fixed", top: 0, right: 0, width: "100%", maxWidth: "400px", height: "100%", backgroundColor: "#fff", boxShadow: "-2px 0 8px rgba(0,0,0,0.2)", zIndex: 20, overflowY: "auto", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Cart</h2>
            <button onClick={() => setCartOpen(false)} style={{ border: "none", background: "none", cursor: "pointer" }}>✖</button>
          </div>

          {orderPlaced ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h3>🎉 Thank you for your order!</h3>
              <p>We’ll contact you soon with confirmation.</p>
            </div>
          ) : cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "flex-start", marginBottom: "10px", background: "#f9f9f9", padding: "10px", borderRadius: "8px" }}>
                  <img src={item.image} alt={item.name} style={{ width: "60px", borderRadius: "5px" }} />
                  <div style={{ flex: 1, marginLeft: "10px" }}>
                    <p>{item.name}{item.selectedColor ? ` (${item.selectedColor})` : ""}</p>
                    <p style={{ fontStyle: "italic", fontSize: "12px" }}>{item.description}</p>
                    <p>Rs {item.price}</p>
                    <div>
                      <button onClick={() => changeQuantity(index, -1)}>-</button>
                      <span style={{ margin: "0 5px" }}>{item.quantity}</span>
                      <button onClick={() => changeQuantity(index, 1)}>+</button>
                      <button onClick={() => removeFromCart(index)} style={{ marginLeft:"10px", color:"red" }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Discount Code Section */}
              <div style={{ marginTop: "15px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  style={{ width: "70%", padding: "6px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
                <button
                  type="button"
                  onClick={applyDiscount}
                  style={{ marginLeft: "5px", padding: "7px 10px", border: "none", backgroundColor: "#000", color: "#fff", borderRadius: "5px", cursor: "pointer" }}
                >
                  Apply
                </button>
              </div>

              {discountApplied && <p style={{ color: "green", fontWeight: "bold" }}>Discount Applied: -Rs {discount.toFixed(0)}</p>}

              <p style={{ fontWeight: "bold" }}>Delivery: Rs {DELIVERY_CHARGE}</p>
              <p style={{ fontWeight: "bold" }}>Total: Rs {total.toFixed(0)}</p>

              <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                <h3>Checkout</h3>
                <input name="name" type="text" placeholder="Name" required style={{ width: "100%", marginBottom:"10px", padding:"6px"}} />
                <input name="email" type="email" placeholder="Email" required style={{ width: "100%", marginBottom:"10px", padding:"6px"}} />
                <input name="contact" type="text" placeholder="Contact" required style={{ width: "100%", marginBottom:"10px", padding:"6px"}} />
                <input name="address" type="text" placeholder="Address" required style={{ width: "100%", marginBottom:"10px", padding:"6px"}} />
                <label htmlFor="city">Select City:</label>
                <select id="city" name="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ width: "100%", marginBottom:"10px", padding:"6px"}}>
                  {cities.map((city, i) => <option key={i} value={city}>{city}</option>)}
                </select>
                <button type="submit" style={{ width:"100%", padding:"10px", backgroundColor:"#000", color:"#fff", border:"none", borderRadius:"5px", cursor:"pointer"}}>Place Order</button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: "40px", padding: "20px", textAlign: "center" }}>
        <a
  href="https://www.facebook.com/share/1AMM4kw4Uf/?mibextid=wwXIfr"
  target="_blank"
  rel="noopener noreferrer"
  style={{ margin: "0 10px" }}
>
  <img
    src="/images/facebook.png"
    alt="Facebook"
    style={{ width: "24px", height: "24px" }}
  />
</a>
        <a
  href="https://www.instagram.com/blingbazaar_pk?igsh=MW9vNzVhc256OXZsMg%3D%3D&utm_source=qr"
  target="_blank"
  rel="noopener noreferrer"
  style={{ margin: "0 10px" }}
>
  <img
    src="/images/instagram.png"
    alt="Instagram"
    style={{ width: "24px", height: "24px" }}
  />
</a>
        <a
  href="https://www.tiktok.com/@bling_bazaar?_t=ZS-90eNaAvkzVo&_r=1"
  target="_blank"
  rel="noopener noreferrer"
  style={{ margin: "0 10px" }}
>
  <img
    src="/images/tiktok.png"
    alt="TikTok"
    style={{ width: "24px", height: "24px" }}
  />
</a>
      </footer>
    </div>
  );
}