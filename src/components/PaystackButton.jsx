// src/components/PaystackButton.jsx
import React from "react";

const PaystackButton = ({ email, amount, name, onSuccess, disabled }) => {
  const handlePayment = () => {
    if (!window.PaystackPop) {
      alert("Paystack SDK not loaded. Check your internet or script tag.");
      return;
    }

    if (!email || !amount || !name) {
      alert("Missing required payment info.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_27ed0741cbea90e217695e515ffbbe5e4bbef71c",
      email,
      amount,
      currency: "NGN",
      metadata: {
        custom_fields: [{ display_name: name }],
      },
      callback: (response) => {
        console.log("Payment successful:", response);
        onSuccess(response);
      },
      onClose: () => {
        alert("Payment closed.");
      },
    });

    handler.openIframe();
  };

  return (
    <button
      className="checkout-btn"
      onClick={handlePayment}
      disabled={disabled}
    >
      Pay Now
    </button>
  );
};

export default PaystackButton;
