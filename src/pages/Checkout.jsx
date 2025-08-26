// src/pages/Checkout.jsx 
import React, { useState, useContext } from "react";
import { CartContext } from "src/context/CartContext";
import PaystackButton from "../components/PaystackButton";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./checkout.css";
import { supabase } from "../supabaseClient"; // ✅ Supabase client

const categories = [
  "NEW ARRIVAL", "TOP", "BOTTOM", "ACC",
  "OUTWEAR", "COLLABORATION", "MEMBERSHIP ONLY", "ARCHIVE SALE",
];

const shippingRates = {
  International: 15000,
  "Local (within Lagos)": 6000,
  "Local (outside Lagos)": 10000,
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    shippingLocation: "",
    country: "",
    state: "",
  });

  const baseTotal = cartItems.reduce((acc, item) => {
    return acc + (item.price || 0) * item.quantity;
  }, 0);

  const shippingCost = shippingRates[formData.shippingLocation] || 0;
  const totalAmount = (baseTotal + shippingCost) * 100; // Paystack uses kobo

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Supabase order logging + inventory reduction
  const handlePaymentSuccess = async () => {
    try {
      // 1. Reduce stock for each item
      for (let item of cartItems) {
        const { error } = await supabase.rpc("reduce_stock", {
          product_id: item.id,
          size: item.selectedSize || null, // ✅ handle per-size or null
          quantity: item.quantity,
        });
        if (error) {
          console.error("Stock update error:", error);
        }
      }

      // 2. Save order in Supabase
      const { error: orderError } = await supabase.from("orders").insert([
        {
          buyer_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          state: formData.state,
          country: formData.country,
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            size: item.selectedSize || "N/A",
            qty: item.quantity,
            price: item.price,
          })),
          total: baseTotal + shippingCost,
        },
      ]);

      if (orderError) {
        console.error("Order save error:", orderError);
        alert("Payment was successful, but order was not logged.");
      } else {
        alert("✅ Payment Successful & Order Saved!");
      }

      // 3. Clear cart + redirect
      clearCart();
      navigate("/shop");
    } catch (err) {
      console.error("Error handling payment success:", err);
      alert("Something went wrong while processing your order.");
    }
  };

  const isFormComplete = () => {
    if (formData.shippingLocation === "International") {
      return (
        formData.name &&
        formData.email &&
        formData.address &&
        formData.phone &&
        formData.shippingLocation &&
        formData.country &&
        formData.state
      );
    }
    if (formData.shippingLocation === "Local (outside Lagos)") {
      return (
        formData.name &&
        formData.email &&
        formData.address &&
        formData.phone &&
        formData.shippingLocation &&
        formData.state
      );
    }
    return (
      formData.name &&
      formData.email &&
      formData.address &&
      formData.phone &&
      formData.shippingLocation
    );
  };

  return (
    <div className="checkout-container">
      {/* Sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span>Sign-in required.</span>
          <Link to="/" className="signin-link">Sign in</Link>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>
        <div className="sidebar-links">
          <div className="sidebar-section">
            <p className="sidebar-title">SHOP</p>
            {categories.map((category) => (
              <button key={category} className="sidebar-link">{category}</button>
            ))}
          </div>
          <Link to="/stockist" className="sidebar-link">STOCKIST</Link>
          <Link to="/collection" className="sidebar-link">COLLECTION</Link>
        </div>
      </div>

      {/* Navbar */}
      <header className="product-detail-header">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <FiMenu />
        </button>
        <Link to="/" className="product-logo">MEZURASHI STUDIOS</Link>
        <nav className="product-nav">
          <Link to="/shop" className="product-nav-link">SHOP</Link>
          <Link to="/stockist" className="product-nav-link">STOCKIST</Link>
          <Link to="/collection" className="product-nav-link">COLLECTION</Link>
          <Link to="/cart" className="bag-link">BAG</Link>
        </nav>
      </header>

      {/* Checkout Form */}
      <div className="checkout-form-wrapper">
        <h2 className="checkout-title">Checkout</h2>
        <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Shipping Address" value={formData.address} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

          <select
            name="shippingLocation"
            value={formData.shippingLocation}
            onChange={handleChange}
            required
            className="shipping-select"
          >
             <option value="">Select Shipping</option> {/* ✅ Placeholder */}
            <option value="Local (within Lagos)">Local (within Lagos)</option>
            <option value="Local (outside Lagos)">Local (outside Lagos)</option>
          </select>

          {formData.shippingLocation === "International" && (
            <>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State / Region"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </>
          )}

          {formData.shippingLocation === "Local (outside Lagos)" && (
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          )}

          <div className="checkout-total">
            <p>Products: ₦{baseTotal.toLocaleString()}</p>
            <p>Shipping: ₦{shippingCost.toLocaleString()}</p>
            <strong>Total: ₦{(baseTotal + shippingCost).toLocaleString()}</strong>
          </div>

          <PaystackButton
            email={formData.email}
            name={formData.name}
            amount={totalAmount}
            onSuccess={handlePaymentSuccess}
            className={`paystack-button ${!isFormComplete() ? "disabled" : ""}`}
            disabled={!isFormComplete()}
          />
        </form>
      </div>
    </div>
  );
}
