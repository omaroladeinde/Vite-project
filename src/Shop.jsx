import React, { useState } from "react";
import { products } from "src/data/products";
import { collections } from "src/data/collections"; // 🆕 import collections
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";


const categories = [
  "NEW ARRIVAL",
  "MEMBERSHIP ONLY",
  "COLLABORATION",
  "OUTWEAR",
  "TOP",
  "BOTTOM",
  "ACC",
  "ARCHIVE SALE",
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("NEW ARRIVAL");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = selectedCategory !== "COLLECTION"
    ? products.filter(product =>
        Array.isArray(product.category)
          ? product.category.includes(selectedCategory)
          : product.category === selectedCategory
      )
    : [];

  return (
    <div className="shop-container">
      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span>Sign-in required.</span>
          <Link to="/" className="signin-link">Sign in</Link>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}><FiX /></button>
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
      <header className="product-detail-header">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <FiMenu />
        </button>

        <Link to="/hero" className="product-logo">MEZURASHI STUDIOS</Link>

        <nav className="product-nav">
          <Link to="/shop" className="product-nav-link">SHOP</Link>
          <Link to="/stockist" className="product-nav-link">STOCKLIST</Link>
          <Link to="/collection" className="product-nav-link">COLLECTION</Link>
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

      {/* Product Grid OR Collection Cards */}
      <main className="product-grid">
        {selectedCategory === "COLLECTION" ? (
          collections.map((col) => (
            <Link
              to="/collection"
              key={col.id}
              className="product-card collection-card"
            >
              <img
                src={col.looks[0]} // Use first look as preview
                alt={col.name}
                className="product-image"
              />
              <div className="product-name">{col.name}</div>
            </Link>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              /> 
              <div className="product-name">{product.name}</div>
            </Link>
          ))

          
        ) : (
          <div className="no-products">No products available in this category.</div>
        )}
      </main>

      <footer className="shop-footer">© 2025 MEZURASHI STUDIOS</footer>
    </div>
  );
}
