import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Stocklist.css";

const categories = [
  
];

export default function Stocklist() {
  const [selectedCategory, setSelectedCategory] = useState("NEW ARRIVAL");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="stockist-container">
      {/* Mobile Sidebar */}
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
                onClick={() => {
                  setSelectedCategory(category);
                  setSidebarOpen(false);
                }}
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

      {/* Navbar */}
      <header className="stockist-header">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <FiMenu />
        </button>

        <Link to="/" className="stockist-logo">MEZURASHI STUDIOS</Link>

        <nav className="stockist-nav">
          <Link to="/shop" className="stockist-nav-link">SHOP</Link>
          <Link to="/stockist" className="stockist-nav-link">STOCKIST</Link>
          <Link to="/collection" className="stockist-nav-link">COLLECTION</Link>
          <Link to="/cart" className="bag-link">BAG</Link>
        </nav>
      </header>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Stockist Content */}
      <div className="stockist-content">
        <h2 className="stockist-text">NO STOCKLIST YET</h2>
      </div>
    </div>
  );
}
