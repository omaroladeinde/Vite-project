import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaswordGate.css";

const PasswordGate = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const correctPassword = "letmein";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== correctPassword) {
      setError("Incorrect password");
      return;
    }

    try {
      await fetch("https://script.google.com/macros/s/AKfycbw-j7--0OY7fxOIwjnqw6EXAIBHjZclp1Wj7ZCWaCou0xzb_gcKhAhDqnqPJ39yqIOz/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error("Email logging failed:", err);
    }

    navigate("/hero");
  };

  return (
    <div className="password-gate">
      <div className="form-box">
        <h1 className="logo">MFG</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">ENTER</button>
        </form>
        <p className="footer">MEZURASHI STUDIOS © 2025 | ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default PasswordGate;
