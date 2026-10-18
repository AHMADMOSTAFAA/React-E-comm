import { formatPrice } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";
export function OrderSummary({ cart, deliveryOptions ,loadCart }) {
  const DeleteItem = async (productId) => {
    await axios.delete(`/api/cart-items/${productId}`);
    await loadCart();
  };
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 &&
              cart.map((item) => {
                const selectedDeliveryOption = deliveryOptions.find(
                  (option) => option.id === item.deliveryOptionId,
                );

                const dateString = selectedDeliveryOption
                  ? new Date(
                      selectedDeliveryOption.estimatedDeliveryTimeMs,
                    ).toLocaleDateString("en-US", {
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
                          <span className="delete-quantity-link link-primary" onClick={()=>DeleteItem(item.productId)}>
                            Delete
                          </span>
                        </div>
                      </div>

                     <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={item} loadCart={loadCart} />
                    </div>
                  </div>
                );
              })}
          </div>
    );
}