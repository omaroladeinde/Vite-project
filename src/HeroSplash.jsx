import React from 'react';
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
          <a href="/shop">SHOP</a>
          <a href="/collection">COLLECTION</a>
          <a href="/contact">CONTACT</a>
        </nav>
        <footer className="footer">
          MEZURASHI STUDIOS © 2025 | ALL RIGHTS RESERVED
        </footer>
      </div>
    </div>
  );
};

export default HeroSplash;
