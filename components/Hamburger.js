import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Hamburger() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Watches", path: "/category/watches" },
    { name: "Mobile Accessories", path: "/category/mobile-accessories" },
    { name: "All Products", path: "/category/all-products" },
  ];

  return (
    <div style={{ position: "relative" }}>
      {/* Hamburger Icon */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          width: "30px",
          height: "25px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span style={{ height: "4px", background: "#000", borderRadius: "2px" }}></span>
        <span style={{ height: "4px", background: "#000", borderRadius: "2px" }}></span>
        <span style={{ height: "4px", background: "#000", borderRadius: "2px" }}></span>
      </div>

      {/* Menu Items */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "35px",
            left: 0,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            borderRadius: "8px",
            overflow: "hidden",
            zIndex: 100,
          }}
        >
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                router.push(item.path);
                setOpen(false);
              }}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}