import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const phone = localStorage.getItem("customerPhone");

  const loadOrders = async () => {
    try {
      if (!phone) {
        setOrders([]);
        return;
      }

      const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/orders/customer/${phone}`
);

      const data = await res.json();

      setOrders(data);
    } catch (err) {
      console.log("My Orders Error:", err);
    }
  };

  useEffect(() => {
    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-orders-page">

      <div className="my-orders-header">
        <h1>📦 My Orders</h1>
        <p>Track your current orders</p>
      </div>

      {!phone ? (
        <div className="no-orders">
          <h2>📱 No Customer Found</h2>
          <p>Please place an order first.</p>

          <button onClick={() => navigate("/")}>
            Order Now
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <h2>🍔 No Live Orders</h2>
          <p>You don't have any active orders right now.</p>

          <button onClick={() => navigate("/")}>
            Order Now
          </button>
        </div>
      ) : (
        <div className="my-orders-list">

          {orders.map((order) => (
            <div className="my-order-card" key={order._id}>

              <div className="order-header">

                <div>
                  <h3>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>

                  <p>
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="order-status">
                  {order.status}
                </span>

              </div>

              <hr />

              <div className="order-items">

                {order.items?.map((item, index) => (
                  <p key={index}>
                    {item.name} × {item.qty}
                  </p>
                ))}

              </div>

              <div className="order-footer">

                <strong>
                  Total: ₹{order.total}
                </strong>

                <button
                 onClick={() =>
  navigate("/track", {
    state: {
      orderId: order._id,
    },
  })
}
                >
                  Track Order
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyOrders;