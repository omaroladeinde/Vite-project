import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Contact.css";

const categories = [
  "NEW ARRIVAL", "TOP", "BOTTOM", "ACC",
  "OUTWEAR", "COLLABORATION", "MEMBERSHIP ONLY", "ARCHIVE SALE",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwshcFZhaedYVrrPdNQdq7gvfM4BX8TpPobhY87Qtd-iQCFxEbWsiVp0VQsfp55VYI8eA/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div>
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

      {/* Navbar */}
      <header className="contact-header">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <FiMenu />
        </button>

        <Link to="/shop" className="contact-logo">MEZURASHI STUDIOS</Link>

        <nav className="contact-nav">
          <Link to="/shop" className="contact-nav-link">SHOP</Link>
          <Link to="/stockist" className="contact-nav-link">STOCKIST</Link>
          <Link to="/collection" className="contact-nav-link">COLLECTION</Link>
          <Link to="/cart" className="bag-link">BAG</Link>
        </nav>
      </header>

      {/* Contact Form */}
      <div className="contact-form-wrapper">
        <div className="contact-container">
          <h2 className="contact-title">CONTACT US</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleChange}
              required
              className="contact-input"
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-input"
            />
            <textarea
              name="message"
              placeholder="YOUR MESSAGE"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="contact-textarea"
            />
            <button type="submit" className="contact-button">
              SEND MESSAGE
            </button>
            {success && <p className="contact-success">Message Sent ✅</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
