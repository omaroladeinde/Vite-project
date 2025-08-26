import React, { useContext, useState } from "react";
import { CartContext } from "src/context/CartContext";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Cart.css";
import PaystackButton from "../components/PaystackButton";
import Checkout from "src/pages/Checkout.jsx";

const categories = [
  "NEW ARRIVAL", "MEMBERSHIP ONLY", "COLLABORATION", "OUTWEAR",
  "TOP", "BOTTOM", "ACC", "ARCHIVE SALE",
];

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const total = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  

  return (
    <div className="cart-container">
      {/* ----------------- Mobile Sidebar ----------------- */}
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
            <Link to="/shop" className="sidebar-title">SHOP</Link>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSidebarOpen(false)}
                className="sidebar-link"
              >
                {category}
              </button>
            ))}
          </div>
          <Link to="/stockist" className="sidebar-link">STOCKIST</Link>
          <Link to="/collection" className="sidebar-link">COLLECTION</Link>
        </div>
      </div>

      {/* ----------------- Header & Navigation ----------------- */}
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

      {/* ----------------- Cart Title ----------------- */}
      <div className="cart-title">
        <h1>Shopping Cart</h1>
        <span className="cart-count">{cartItems.length}</span>
      </div>

      {/* ----------------- Table Header ----------------- */}
      <div className="cart-table-header">
        <span>Product Information</span>
        <span>Quantity</span>
        <span>Order Amount</span>
        <span>{/* Spacer for delete button */}</span>
      </div>

      {/* ----------------- Cart Items or Empty ----------------- */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your shopping cart is empty.</p>
          <Link to="/shop" className="continue-shopping">Continue shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items"> 
  {cartItems.map((item) => (
    <div key={`${item.id}-${item.selectedSize || ""}`} className="cart-item-row">
      <div className="item-info">
        <img src={item.image} alt={item.name} />
        <span>
          {item.name}
          {item.selectedSize && ` (${item.selectedSize})`}
        </span>
      </div>

      <span>{item.quantity}</span>

      <span>
        ₦
        {!isNaN(item.price) && item.price
          ? (item.price * item.quantity).toLocaleString()
          : "0"}
      </span>

      <button
        className="delete-btn"
        onClick={() => removeFromCart(item.id, item.selectedSize)}
        aria-label="Remove item"
      >
        ×
      </button>
    </div>
  ))}
</div>

          {/* ----------------- Total ----------------- */}
         <div className="cart-total">
  <div className="total-text">
    <span>Total:</span>
    <span className="total-amount">₦{total.toLocaleString()}</span>
  </div>
  <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
</div>
        </>
      )}
    </div>
  );
}
