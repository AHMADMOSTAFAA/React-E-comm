import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CheckOutPage.css";
import "./checkout-header.css";
import Header from "../components/header";
import { formatPrice } from "../utils/money";

export default function CheckOutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        console.log("Delivery options:", response.data);
        setDeliveryOptions(response.data);
      });
  }, []);

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((item) => {
              const selectedDeliveryOption = deliveryOptions.find(
                (option) => option.id === item.deliveryOptionId,
              );
              
              const dateString = selectedDeliveryOption 
                ? new Date(selectedDeliveryOption.estimatedDeliveryTimeMs).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : "";
              
              return (
                <div key={item.id} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: {dateString}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={item.product.image}
                      alt={item.product.name}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">{item.product.name}</div>
                      <div className="product-price">
                        {formatPrice(item.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity:{" "}
                          <span className="quantity-label">
                            {item.quantity}
                          </span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((option) => {
                        const optionDateString = new Date(
                          option.estimatedDeliveryTimeMs,
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        });

                        return (
                          <div className="delivery-option" key={option.id}>
                            <input
                              type="radio"
                              checked={item.deliveryOptionId === option.id}
                              className="delivery-option-input"
                              name={`delivery-option-${item.productId}`}
                            />
                            <div>
                              <div className="delivery-option-date">
                                {optionDateString}
                              </div>
                              <div className="delivery-option-price">
                                {option.priceCents === 0
                                  ? "FREE Shipping"
                                  : `$${(option.priceCents / 100).toFixed(2)} - Shipping`}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">$42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">$4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">$47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">$4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">$52.51</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}