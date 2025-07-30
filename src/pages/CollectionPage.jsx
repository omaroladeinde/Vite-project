import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { collections } from "src/data/collections";
import "./CollectionPage.css";

const categories = [
  "NEW ARRIVAL", "MEMBERSHIP ONLY", "COLLABORATION", "OUTWEAR",
  "TOP", "BOTTOM", "ACC", "ARCHIVE SALE",
];

export default function CollectionPage() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [setSelectedCategory] = useState("");

  return (
    <div className="collection-page">
      {/* --- Mobile Sidebar --- */}
      <div className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span>Sign-in required.</span>
          <Link to="/login" className="signin-link">Sign in</Link>
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

      {/* --- Header/Nav --- */}
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

      {/* --- Main Content --- */}
      {!selectedCollection ? (
        <div className="collection-links">
          <h1 className="collection-title">COLLECTIONS</h1>
          {collections.map((col) => (
            <button
              key={col.id}
              className="collection-link"
              onClick={() => setSelectedCollection(col)}
            >
              {col.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="collection-looks">
          <h2 className="collection-name">{selectedCollection.name}</h2>
          <div className="looks-grid">
            {selectedCollection.looks.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Look ${idx + 1}`}
                className="look-image"
              />
            ))}
          </div>
          <button
            className="back-to-collections"
            onClick={() => setSelectedCollection(null)}
          >
            ← Back to Collections
          </button>
        </div>
      )}
    </div>
  );
}
