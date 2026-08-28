import "./Checkout.css";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash");
  const [instructions, setInstructions] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
const orderLock = useRef(false);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

 const gst = Math.round(subtotal * 0.05);

const grandTotal = Math.round(subtotal + gst);

  const handlePlaceOrder = async () => {
  if (!name || !phone || !tableNumber || !address) {
    alert("Please fill all details.");
    return;
  }

  // Prevent multiple clicks / duplicate orders
  if (orderLock.current || placingOrder) {
    return;
  }

  orderLock.current = true;
  setPlacingOrder(true);

  // One unique ID for this order attempt
  const orderRequestId = crypto.randomUUID();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/orders`,
      {
        orderRequestId,

        customer: name,
        phone,
        tableNumber,
        address,
        payment,
        instructions,

        items: cart.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price: item.price,
        })),

        total: grandTotal,
      }
    );

    localStorage.setItem("customerPhone", phone);

    alert(response.data.message);

    navigate("/success", {
      state: {
        order: response.data.order,
      },
    });
  } catch (error) {
    console.log(error.response?.data || error);

    alert(
      error.response?.data?.message ||
      "Unable to place order. Please try again."
    );

    // Allow retry if request actually failed
    orderLock.current = false;
    setPlacingOrder(false);
  }
};

  return (
    <div className="checkout-page">

      <h1>Y&Y Veg Grill</h1>

      <h2>Secure Checkout 🔒</h2>

      {/* Customer Name */}

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Phone */}

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {/* Table Number */}

      <input
        type="text"
        placeholder="Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
      />

      {/* Address */}

      <textarea
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <div className="payment-section">

  <div className="payment-options">

    <h3>Payment Method</h3>

    <label className={`payment-card ${payment === "Cash" ? "selected" : ""}`}>
      <input
        type="radio"
        value="Cash"
        checked={payment === "Cash"}
        onChange={(e) => setPayment(e.target.value)}
      />

      <span className="payment-icon">💵</span>

      <span>
        <strong>Cash</strong>
        <small>Pay when your order arrives</small>
      </span>
    </label>


    <label className={`payment-card ${payment === "UPI" ? "selected" : ""}`}>
      <input
        type="radio"
        value="UPI"
        checked={payment === "UPI"}
        onChange={(e) => setPayment(e.target.value)}
      />

      <span className="payment-icon">📱</span>

      <span>
        <strong>UPI</strong>
        <small>Pay when your order arrives</small>
      </span>
    </label>


    <label className={`payment-card ${payment === "Card" ? "selected" : ""}`}>
      <input
        type="radio"
        value="Card"
        checked={payment === "Card"}
        onChange={(e) => setPayment(e.target.value)}
      />

      <span className="payment-icon">💳</span>

      <span>
        <strong>Card</strong>
        <small>Pay when your order arrives</small>
      </span>
    </label>

  </div>


  <div className="payment-notice">

    <div className="notice-shine"></div>

    <div className="notice-icon">💡</div>

    <div className="notice-content">
      <h3>Payment Notice</h3>

      <p>
        Your selected payment method will be
        collected when your order is delivered.
      </p>

      <span>
        Please keep your selected payment method ready.
      </span>
    </div>

  </div>

  <div className="instruction-section">

  <div className="instruction-heading">
    <span>🍽️</span>

    <div>
      <h3>Special Instructions</h3>
      <p>Tell us how you'd like your food prepared</p>
    </div>
  </div>

  <textarea
    className="instruction-input"
    placeholder="Example: Normal spicy, less spicy, no onion, make it crispy..."
    value={instructions}
    onChange={(e) => setInstructions(e.target.value)}
    maxLength={250}
  />

  <div className="instruction-footer">
    <span>Optional</span>
    <small>{instructions.length}/250</small>
  </div>

</div>

</div>

      <h2>Order Summary</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr />

          <h3>Subtotal : ₹{Math.round(subtotal)}</h3>

<h3>GST (5%) : ₹{gst}</h3>

<h2>Grand Total : ₹{grandTotal}</h2>
        </>
      )}

     <button
  className="checkout-btn"
  onClick={handlePlaceOrder}
  disabled={placingOrder}
>
  {placingOrder ? "Placing Order..." : "Place Order"}
</button>

    </div>
  );
}

export default Checkout;