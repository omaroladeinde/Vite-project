import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { CartContext } from "src/context/CartContext";
import { supabase } from "src/supabaseClient"; // Supabase client
import "./ProductDetail.css";

const categories = [
  "NEW ARRIVAL", "TOP", "BOTTOM", "ACC",
  "OUTWEAR", "COLLABORATION", "MEMBERSHIP ONLY", "ARCHIVE SALE",
];

const sizes = ["S", "M", "L", "XL"];

export default function ProductDetail() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [showSizeError, setShowSizeError] = useState(false);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!product) return <div className="text-white p-10">Product not found</div>;

  // Detect if product uses sizes (stock is stored as JSON in Supabase)
  const hasSizes = product.stock && Object.keys(product.stock).length > 0;

  // Determine if fully sold out
  const isFullySoldOut = hasSizes
    ? sizes.every((size) => (product.stock?.[size] || 0) <= 0)
    : product.status?.toLowerCase() === "soldout";

  const handleAddToCart = () => {
    if (hasSizes) {
      if (!selectedSize) {
        setShowSizeError(true);
        setTimeout(() => setShowSizeError(false), 2000);
        return;
      }

      const availableQty = product.stock?.[selectedSize] || 0;
      if (availableQty <= 0) {
        alert("This size is sold out.");
        return;
      }
    }

    const productToAdd = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: Number(product.price),
      selectedSize: hasSizes ? selectedSize : null,
      quantity: 1,
    };

    addToCart(productToAdd);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setSelectedSize("");
    }, 2000);
  };

  return (
    <div className="product-detail-container">
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
            <p className="sidebar-title">SHOP</p>
            <div className="sidebar-link-list">
              {categories.map((category) => (
                <button key={category} className="sidebar-link" onClick={() => setSidebarOpen(false)}>
                  {category}
                </button>
              ))}
            </div>
          </div>
          <Link to="/stockist" className="sidebar-link">STOCKIST</Link>
          <Link to="/collection" className="sidebar-link">COLLECTION</Link>
        </div>
      </div>

      {/* Navbar */}
      <header className="product-detail-header">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}><FiMenu /></button>
        <Link to="/" className="product-logo">MEZURASHI STUDIOS</Link>
        <nav className="product-nav">
          <Link to="/shop" className="product-nav-link">SHOP</Link>
          <Link to="/stockist" className="product-nav-link">STOCKIST</Link>
          <Link to="/collection" className="product-nav-link">COLLECTION</Link>
          <Link to="/cart" className="bag-link">BAG</Link>
        </nav>
      </header>

      {/* Product Main Section */}
      <div className="product-main">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="main-product-image" />
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          {product.status && <span className="product-status">{product.status}</span>}
          <div className="product-price">₦{product.price}</div>
          <div className="product-description">{product.description}</div>

          <ul className="product-details">
            {product.details?.map((line, idx) => <li key={idx}>- {line}</li>)}
          </ul>

          <div className="product-meta-label">Fabric</div>
          <div className="product-meta-value">{product.fabric}</div>

          <div className="product-meta-label">Colour</div>
          <div className="product-meta-value">{product.color}</div>

          <div className="product-meta-label">Size Guide (Measurement : CM)</div>
          <div className="product-meta-value size-guide">{product.sizeGuide}</div>

          {/* Size Picker - only if product has sizes */}
          {hasSizes && (
            <>
              <div className="product-meta-label">Select Size</div>
              <div className="size-picker">
                {sizes.map((size) => {
                  const outOfStock = (product.stock?.[size] || 0) <= 0;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-option ${selectedSize === size ? "selected" : ""}`}
                      disabled={outOfStock}
                      style={{ opacity: outOfStock ? 0.5 : 1 }}
                    >
                      {size} {outOfStock && "(Sold Out)"}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Add to Cart */}
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={isFullySoldOut}
            style={{ opacity: isFullySoldOut ? 0.5 : 1 }}
          >
            {isFullySoldOut ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* On Body Section */}
      {product.onBodyImages?.length > 0 && (
        <div className="on-body-section">
          <h2 className="on-body-heading">ON BODY</h2>
          <div className="on-body-images">
            {product.onBodyImages.map((src, index) => (
              <img key={index} src={src} alt={`On body view ${index + 1}`} className="on-body-image" />
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart Success Popup */}
      {showPopup && <div className="cart-popup">Added to cart successfully</div>}

      {/* Size not selected Error Popup */}
      {showSizeError && <div className="cart-popup error">Please select a size</div>}
    </div>
  );
}
