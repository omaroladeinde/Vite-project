import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import './HeroSplash.css';

const HeroSplash = () => {
  return (
    <div className="hero-splash">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src="/videos/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="overlay">
        <h1 className="logo">MFG</h1>
        <nav className="hero-nav">
          <Link to="/shop">SHOP</Link>
          <Link to="/collection">COLLECTION</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>
        <footer className="footer">
          MEZURASHI STUDIOS © 2025 | ALL RIGHTS RESERVED
        </footer>
      </div>
    </div>
  );
};

export default HeroSplash;
