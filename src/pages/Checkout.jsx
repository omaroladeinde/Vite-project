// src/pages/Checkout.jsx
import React, { useState, useContext } from "react";
import { CartContext } from "src/context/CartContext";
import PaystackButton from "../components/PaystackButton";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./checkout.css";
import { products } from "src/data/products";

const categories = [
  "NEW ARRIVAL", "MEMBERSHIP ONLY", "COLLABORATION", "OUTWEAR",
  "TOP", "BOTTOM", "ACC", "ARCHIVE SALE",
];

const shippingRates = {
  International: 15000,
  "Local (within Lagos)": 3000,
  "Local (outside Lagos)": 5000,
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
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
  const totalAmount = (baseTotal + shippingCost) * 100;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = () => {
    cartItems.forEach((cartItem) => {
      const productIndex = products.findIndex((p) => p.id === cartItem.id);
      if (productIndex !== -1) {
        const product = products[productIndex];
        const size = cartItem.selectedSize;

        if (product.stock && product.stock[size]) {
          product.stock[size] -= cartItem.quantity;
          if (product.stock[size] <= 0) {
            product.stock[size] = 0;
          }
        }

        const isSoldOut = Object.values(product.stock).every((qty) => qty <= 0);
        if (isSoldOut) {
          product.status = "Sold Out";
        }
      }
    });

    alert("Payment Successful!");
    clearCart();
    navigate("/shop");
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
          <Link to="/login" className="signin-link">Sign in</Link>
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
            <option value="" disabled>Select Shipping Location</option>
            <option value="International">International</option>
            <option value="Local (within Lagos)">Local (within Lagos)</option>
            <option value="Local (outside Lagos)">Local (outside Lagos)</option>
          </select>

          {/* Country & State if International */}
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

          {/* State if outside Lagos */}
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
