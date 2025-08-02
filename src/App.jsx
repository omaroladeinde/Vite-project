import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './HeroSplash';
import Shop from './Shop';
import ProductDetail from "./pages/ProductDetail";
import Cart from './pages/Cart';
import CollectionPage from './pages/CollectionPage';
import Checkout from "./pages/Checkout";
import PasswordGate from "./pages/PasswordGate";
import HeroSplash from './HeroSplash';
import Notify from './pages/Notify'; // adjust path if needed

// Inventory Setup 
import { initializeInventory } from "src/utils/inventory";

function App() {
  useEffect(() => {
    initializeInventory();
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<PasswordGate />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/notify" element={<Notify />} />
      </Routes>
    </Router>
  );
}

export default App;
