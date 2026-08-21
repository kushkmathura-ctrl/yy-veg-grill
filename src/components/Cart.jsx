import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart, showCart, setShowCart }) {

  const navigate = useNavigate();

  const removeItem = (name) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.name !== name)
    );
  };

  const increaseQty = (name) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (name) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  if (!showCart) return null;

  return (
    <div className="cart">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>🛒 Your Cart</h2>

        <button onClick={() => setShowCart(false)}>
          ❌
        </button>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>

              <div>
                <h4>{item.name}</h4>

                <div style={{ marginTop: "8px" }}>
                  <button onClick={() => decreaseQty(item.name)}>
                    ➖
                  </button>

                  <span style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </span>

                  <button onClick={() => increaseQty(item.name)}>
                    ➕
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.name)}
                >
                  Remove
                </button>
              </div>

              <p>₹{item.price * item.quantity}</p>

            </div>
          ))}

          <hr />

          <h3>
            Total: ₹
            {cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </h3>

          <button
            className="checkout-btn"
            onClick={() => {
              setShowCart(false);
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;