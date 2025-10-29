import React, { useState } from "react";
import { useRouter } from "next/router";
import products from "../data";
import Hamburger from "../components/Hamburger";
export default function Home() {
  const router = useRouter();

  // Pick 4 Best Sellers
  const bestSellers = [
    products.find((p) => p.name === "Arabic Aura"),
    products.find((p) => p.name === "A9 AirPods"),
    products.find((p) => p.name === "Gucci Ladies"),
    products.find((p) => p.name === "Patek Philippe"),
  ].filter(Boolean);

  // State
  const [selectedColors, setSelectedColors] = useState({});
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const DELIVERY_CHARGE = 300;

  // Handlers
  const handleColorChange = (productName, colorName) => {
    setSelectedColors({ ...selectedColors, [productName]: colorName });
  };

  const addToCart = (product) => {
    const colorName = selectedColors[product.name] || product.colors[0]?.name || "";
    const colorObj = product.colors.find((c) => c.name === colorName) || product.colors[0];

    const existingIndex = cart.findIndex(
      (item) => item.name === product.name && item.selectedColor === colorObj.name
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
            `${item.name} (${item.selectedColor}) x${item.quantity} - Rs ${item.price * item.quantity}`
        )
        .join("\n")
    );
    formData.append("totalProducts", "Rs " + totalProducts);
    formData.append("discount", discountApplied ? "-Rs " + discount : "No discount");
    formData.append("deliveryCharge", "Rs " + DELIVERY_CHARGE);
    formData.append("finalTotal", "Rs " + total);

    const response = await fetch("https://formspree.io/f/mgvpkeqw", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setOrderPlaced(true);
      setCart([]);
      setDiscountCode("");
      setDiscountApplied(false);

      setTimeout(() => {
        setOrderPlaced(false);
        setCartOpen(false);
      }, 3000);
    } else {
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fff", color: "#000" }}>
      {/* Header */}
      <header
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
    zIndex: 10,
    flexWrap: "wrap",
  }}
>
  <Hamburger />
  <div
    style={{
      textAlign: "center",
      fontSize: "36px",
      color: "#A67D50",
      fontWeight: "bold",
      cursor: "pointer",
    }}
    onClick={() => router.push("/")}
  >
    BLING BAZAAR
  </div>
  <div style={{ cursor: "pointer", position: "relative" }} onClick={() => setCartOpen(!cartOpen)}>
    <span style={{ fontSize: "28px" }}>🛒</span>
    {cart.length > 0 && (
      <span
        style={{
          position: "absolute",
          top: "-5px",
          right: "-10px",
          backgroundColor: "#FFD700",
          borderRadius: "50%",
          padding: "2px 6px",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    )}
  </div>
</header>
      {/* Hero */}
      <section style={{ textAlign: "center", padding: "40px 20px", backgroundColor: "#f9f9f9" }}>
        <img
          src="/images/rolexskydweller.jpg"
          alt="Hero"
          style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}
        />
      </section>

     {/* Category Cards */}
<section
  style={{
    padding: "20px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  }}
>
  {[
    { name: "Mobile Accessories", image: "/images/m10.jpg" },
    { name: "Watches", image: "/images/watch-black.jpg" },
    { name: "All Products", image: "/images/allproducts.jpg" },
  ].map((cat) => (
    <div
      key={cat.name}
      onClick={() =>
  router.push(
    cat.name === "All Products"
      ? "/category/all-products"
      : `/category/${encodeURIComponent(cat.name.toLowerCase().replace(/\s+/g, "-"))}`
  )
}
      style={{
        cursor: "pointer",
        width: "250px",
        height: "150px",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={cat.image}
        alt={cat.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          background: "rgba(0,0,0,0.6)",
          color: "#fff",
          textAlign: "center",
          padding: "10px 0",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {cat.name}
      </div>
    </div>
  ))}
</section>

      {/* Best Sellers */}
      <section style={{ padding: "40px 20px" }}>
        <h2 style={{ fontSize: "28px", borderBottom: "2px solid #eee", display: "inline-block" }}>
          Best Sellers
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {bestSellers.map((product, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={product.colors[0].image}
                alt={product.name}
                style={{ maxWidth: "100%", borderRadius: "10px" }}
              />
              <h3>{product.name}</h3>
              <p style={{ fontStyle: "italic", fontSize: "13px" }}>{product.description}</p>
              <p>Rs {product.price}</p>
              <button
                onClick={() => addToCart(product)}
                style={{
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 16px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart */}
      {cartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            maxWidth: "400px",
            height: "100%",
            backgroundColor: "#fff",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
            zIndex: 20,
            overflowY: "auto",
            padding: "20px",
          }}
        >
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
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "flex-start", marginBottom: "10px", background: "#f9f9f9", padding: "10px", borderRadius: "8px" }}
                >
                  <img src={item.image} alt={item.name} style={{ width: "60px", borderRadius: "5px" }} />
                  <div style={{ flex: 1, marginLeft: "10px" }}>
                    <p>{item.name}{item.selectedColor ? ` (${item.selectedColor})` : ""}</p>
                    <p style={{ fontStyle: "italic", fontSize: "12px" }}>{item.description}</p>
                    <p>Rs {item.price}</p>
                    <div>
                      <button onClick={() => changeQuantity(index, -1)}>-</button>
                      <span style={{ margin: "0 5px" }}>{item.quantity}</span>
                      <button onClick={() => changeQuantity(index, 1)}>+</button>
                      <button onClick={() => removeFromCart(index)} style={{ marginLeft: "10px", color: "red" }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: "15px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
                <input type="text" placeholder="Enter discount code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} style={{ width: "70%", padding: "6px", border: "1px solid #ccc", borderRadius: "5px" }} />
                <button type="button" onClick={applyDiscount} style={{ marginLeft: "5px", padding: "7px 10px", border: "none", backgroundColor: "#000", color: "#fff", borderRadius: "5px", cursor: "pointer" }}>Apply</button>
              </div>

              {discountApplied && <p style={{ color: "green", fontWeight: "bold" }}>Discount Applied: -Rs {discount.toFixed(0)}</p>}

              <p style={{ fontWeight: "bold" }}>Delivery: Rs {DELIVERY_CHARGE}</p>
              <p style={{ fontWeight: "bold" }}>Total: Rs {total.toFixed(0)}</p>

              <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                <h3>Checkout</h3>
                <input name="name" type="text" placeholder="Name" required style={{ width: "100%", marginBottom: "10px", padding: "6px" }} />
                <input name="email" type="email" placeholder="Email" required style={{ width: "100%", marginBottom: "10px", padding: "6px" }} />
                <input name="contact" type="text" placeholder="Contact" required style={{ width: "100%", marginBottom: "10px", padding: "6px" }} />
                <input name="address" type="text" placeholder="Address" required style={{ width: "100%", marginBottom: "10px", padding: "6px" }} />
                <select name="city" required style={{ width: "100%", marginBottom: "10px", padding: "6px", borderRadius: "5px", border: "1px solid #ccc" }}>
                  <option value="">Select City</option>
                  {["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Gujranwala","Hyderabad","Sukkur","Bahawalpur","Mardan","Abbottabad","Okara","Sahiwal","Kasur","Rahim Yar Khan","Jhelum","Gujrat","Larkana","Dera Ghazi Khan","Mirpur Khas","Sheikhupura","Nowshera","Chiniot","Mansehra","Bannu","Kohat","Turbat","Gwadar","Zhob","Chaman","Muzaffarabad","Gilgit","Hunza","Skardu","Khuzdar","Tando Adam","Tando Allahyar","Jacobabad","Moro","Hafizabad","Bhakkar","Khairpur","Mandi Bahauddin","Swat","Charsadda","Haripur","Vehari","Dadu","Kandhkot","Shikarpur","Jamshoro","Attock","Khanewal","Mianwali","Layyah","Toba Tek Singh","Jhang","Pakpattan","Kharian","Wazirabad","Lodhran","Kotri","Sargodha","Narowal","Gojra","Muzaffargarh","Kasur","Abbottabad","Swabi","Hangu","Mithi","Umerkot","Badin","Khairpur Nathan Shah"].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Place Order</button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: "40px", padding: "20px", textAlign: "center", borderTop: "1px solid #eee" }}>
        <a href="https://www.facebook.com/share/1AMM4kw4Uf/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
          <img src="/images/facebook.png" alt="Facebook" style={{ width: "24px", height: "24px" }} />
        </a>
        <a href="https://www.instagram.com/blingbazaar_pk?igsh=MW9vNzVhc256OXZsMg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
          <img src="/images/instagram.png" alt="Instagram" style={{ width: "24px", height: "24px" }} />
        </a>
        <a href="https://www.tiktok.com/@bling_bazaar?_t=ZS-90eNaAvkzVo&_r=1" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
          <img src="/images/tiktok.png" alt="TikTok" style={{ width: "24px", height: "24px" }} />
        </a>
      </footer>
    </div>
  );
}