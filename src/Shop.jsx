// src/pages/Shop.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { supabase } from "src/supabaseClient"; // ✅ Supabase client

const categories = [
  "NEW ARRIVAL",
  "TOP",
  "BOTTOM",
  "ACC",
  "OUTWEAR",
  "COLLABORATION",
  "MEMBERSHIP ONLY",
  "ARCHIVE SALE",
  "COLLECTION",
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("NEW ARRIVAL");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);

  // ✅ Fetch products & collections from Supabase
  useEffect(() => {
    const fetchData = async () => {
      let { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*");

      if (productsError) console.error(productsError);
      else setProducts(productsData || []);

      let { data: collectionsData, error: collectionsError } = await supabase
        .from("collections")
        .select("*");

      if (collectionsError) console.error(collectionsError);
      else setCollections(collectionsData || []);
    };

    fetchData();
  }, []);

  // ✅ Helper: Check if product is sold out
  const isSoldOut = (product) => {
    if (!product.stock) return true; // No stock means sold out

    if (typeof product.stock === "number") {
      return product.stock <= 0; // Single stock number
    }

    if (typeof product.stock === "object") {
      // JSONB per-size stock: check if all are 0
      return Object.values(product.stock).every((qty) => qty <= 0);
    }

    return true;
  };

  // ✅ Filter products by category
  const filteredProducts =
    selectedCategory !== "COLLECTION"
      ? products.filter((product) =>
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
      <header className="product-detail-header">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <FiMenu />
        </button>
        <Link to="/" className="product-logo">MEZURASHI STUDIOS</Link>
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
            className={`category-btn ${
              selectedCategory === category ? "active" : ""
            }`}
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
              <img src={col.preview_image} alt={col.name} className="product-image" />
              <div className="product-name">{col.name}</div>
            </Link>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) =>
            isSoldOut(product) ? (
              <div key={product.id} className="product-card soldout">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-name">{product.name}</div>
                <span className="soldout-tag">SOLD OUT</span>
              </div>
            ) : (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-name">{product.name}</div>
              </Link>
            )
          )
        ) : (
          <div className="no-products">No products available in this category.</div>
        )}
      </main>

      <footer className="shop-footer">© 2025 MEZURASHI STUDIOS</footer>
    </div>
  );
}
