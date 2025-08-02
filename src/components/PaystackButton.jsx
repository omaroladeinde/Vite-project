// src/components/PaystackButton.jsx 
import React from "react";

const PaystackButton = ({ email, amount, name, onSuccess, disabled, metadata }) => {
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
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: metadata?.name || name,
          },
          {
            display_name: "Address",
            variable_name: "address",
            value: metadata?.address || "",
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: metadata?.phone || "",
          },
          {
            display_name: "Shipping Location",
            variable_name: "shipping_location",
            value: metadata?.shippingLocation || "",
          },
          {
            display_name: "Country",
            variable_name: "country",
            value: metadata?.country || "",
          },
          {
            display_name: "State",
            variable_name: "state",
            value: metadata?.state || "",
          },
          {
            display_name: "Cart Items",
            variable_name: "cart_items",
            value: JSON.stringify(metadata?.cart || []),
          },
          {
            display_name: "Shipping Fee",
            variable_name: "shipping_fee",
            value: metadata?.shippingFee || 0,
          },
        ],
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
