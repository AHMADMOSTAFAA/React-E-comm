import { formatPrice } from "../../utils/money";
import axios from "axios";
import {useNavigate} from "react-router";
export function PaymentSummary({ paymentSummary ,loadCart}) {
  const navigate=useNavigate();
  const createOrder=async () => {
  await  axios.post("/api/orders")
  await loadCart();
  navigate("/orders");
  }
    return (
           <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            {paymentSummary && (
              <div className="payment-summary-details">
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatPrice(paymentSummary.productCostCents || 0)}
                  </div>
                </div>
                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatPrice(paymentSummary.shippingCostCents || 0)}
                  </div>
                </div>
                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatPrice(paymentSummary.totalCostBeforeTaxCents || 0)}
                  </div>
                </div>
                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatPrice(paymentSummary.taxCents || 0)}
                  </div>
                </div>
                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatPrice(paymentSummary.totalCostCents || 0)}
                  </div>
                </div>
                <button className="place-order-button" onClick={createOrder}>
                  Place your order
                </button>
              </div>
            )}
          </div>
    );
}
