import axios from "axios";

export function DeliveryOptions({ deliveryOptions, cartItem ,loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((option) => {
        const optionDateString = new Date(
          option.estimatedDeliveryTimeMs,
        ).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        });
        const updateDeliveryOption = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: option.id,
          });
          await loadCart();
        };
        return (
          <div className="delivery-option" key={option.id} onClick={updateDeliveryOption}>
            <input
              type="radio"
              checked={option.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">{optionDateString}</div>
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
  );
}
