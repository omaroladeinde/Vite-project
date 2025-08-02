import React, { useState } from "react";
import "./PaswordGate.css"; // Reuse the same CSS file

const Notify = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("https://script.google.com/macros/s/AKfycbw-j7--0OY7fxOIwjnqw6EXAIBHjZclp1Wj7ZCWaCou0xzb_gcKhAhDqnqPJ39yqIOz/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch (err) {
      console.error("Email submission failed:", err);
    }
  };

  return (
    <div className="pw-gate-container">
      <div className="pw-form-box">
        <h1 className="pw-logo">MFG</h1>
        {sent ? (
          <p style={{ color: "#fff", fontSize: "14px" }}>
            ✅ You’ll be notified when we open. Thanks!
          </p>
        ) : (
          <form className="pw-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="pw-input"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="pw-button">
              SEND
            </button>
          </form>
        )}
        <footer className="pw-footer">
          MEZURASHI STUDIOS © 2025 | ALL RIGHTS RESERVED
        </footer>
      </div>
    </div>
  );
};

export default Notify;
