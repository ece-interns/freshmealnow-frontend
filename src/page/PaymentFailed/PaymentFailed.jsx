import React from "react";
import "./PaymentFailed.css";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <>
      <div className="payment-fail">
        <h1>Payment Not Completed</h1>
        <div className="back-link">
          <Link to="/">Go to Home</Link>
        </div>
      </div>
    </>
  );
};

export default PaymentFailed;
