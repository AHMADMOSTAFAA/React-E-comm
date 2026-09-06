import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CheckOutPage.css";
import "./checkout-header.css";
import Header from "../../components/header";
import { formatPrice } from "../../utils/money";
import { PaymentSummary } from "./PaymentSummary";
import { OrderSummary } from "./OrderSummary";

export default function CheckOutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
   async function fetchData() {
      try {
        const deliveryOptions=await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
        setDeliveryOptions(deliveryOptions.data);
      } catch (error) {
        console.error("Error fetching delivery options:", error);
      }
   try {
    const paymentSummary=await axios.get("/api/payment-summary");
      console.log("Payment summary:", paymentSummary.data);
      setPaymentSummary(paymentSummary.data);
     
   } catch (error) {
    console.error("Error fetching payment summary:", error);
   }
  
  }
   fetchData();
}, []);

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
