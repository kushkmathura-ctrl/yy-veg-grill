import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./TrackOrder.css";

function TrackOrder() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const orderId = state?.orderId;

  const [order, setOrder] = useState(null);

  const loadOrder = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`
      );

      const data = await res.json();

      setOrder(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!orderId) return;

    loadOrder();

    const socket = io(
  import.meta.env.VITE_API_URL
);

    socket.on("connect", () => {
      console.log("🟢 Track Order Socket Connected");
    });

    socket.on("ORDER_STATUS_UPDATED", (updatedOrder) => {
      console.log("🔄 Order Status Updated");

      if (updatedOrder._id === orderId) {
        setOrder(updatedOrder);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Track Order Socket Disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId]);

  const statuses = [
    {
      name: "Pending",
      icon: "🟠",
      title: "Order Received",
      text: "Your order has been received.",
    },
    {
      name: "Preparing",
      icon: "👨‍🍳",
      title: "Being Prepared",
      text: "Our kitchen is preparing your food.",
    },
    {
      name: "Ready",
      icon: "🍽️",
      title: "Ready",
      text: "Your delicious order is ready.",
    },
    {
      name: "Delivered",
      icon: "✅",
      title: "Delivered",
      text: "Enjoy your meal! ❤️",
    },
  ];

  const getStatusIndex = () => {
    return statuses.findIndex(
      (item) => item.name === order?.status
    );
  };

  if (!orderId) {
    return (
      <div className="track-page">
        <div className="track-card empty-track">
          <div className="empty-icon">📦</div>

          <h1>Order Not Found</h1>

          <p>
            We couldn't find an order to track.
          </p>

          <button
            onClick={() => navigate("/")}
            className="track-home-btn"
          >
            🏠 Back To Home
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="track-page">
        <div className="track-card loading-card">
          <div className="loading-circle">
            ⏳
          </div>

          <h2>Loading Your Order...</h2>

          <p>Please wait a moment.</p>
        </div>
      </div>
    );
  }

  const currentIndex = getStatusIndex();

  return (
    <div className="track-page">

      <div className="track-card">

        {/* Header */}

        <div className="track-header">

          <div className="track-logo">
            🍔
          </div>

          <span className="live-badge">
            <span className="live-dot"></span>
            LIVE ORDER
          </span>

          <h1>Track Your Order</h1>

          <p>
            Follow your order's journey in real time.
          </p>

        </div>


        {/* Order Info */}

        <div className="order-info">

          <div>
            <span>ORDER ID</span>

            <strong>
              YVG-{order._id.slice(-6).toUpperCase()}
            </strong>
          </div>

          <div>
            <span>CUSTOMER</span>

            <strong>
              {order.customer}
            </strong>
          </div>

          <div>
            <span>TOTAL</span>

            <strong>
              ₹{order.total}
            </strong>
          </div>

        </div>


        {/* Current Status */}

        <div className="current-status">

          <span>Current Status</span>

          <strong>
            {order.status === "Pending" &&
              "🟠 Order Received"}

            {order.status === "Preparing" &&
              "👨‍🍳 Preparing Your Food"}

            {order.status === "Ready" &&
              "🍽️ Your Order Is Ready"}

            {order.status === "Delivered" &&
              "✅ Order Delivered"}
          </strong>

        </div>


        {/* Timeline */}

        <div className="status-timeline">

          {statuses.map((status, index) => {

            const completed = index <= currentIndex;

            const active = index === currentIndex;

            return (
              <div
                className={`status-step ${
                  completed ? "completed" : ""
                } ${active ? "active" : ""}`}
                key={status.name}
              >

                <div className="step-line"></div>

                <div className="step-icon">
                  {status.icon}
                </div>

                <div className="step-content">

                  <h3>
                    {status.title}
                  </h3>

                  <p>
                    {status.text}
                  </p>

                </div>

              </div>
            );
          })}

        </div>


        {/* Preparation */}

        {order.status !== "Delivered" && (
          <div className="preparation-box">

            <div className="preparation-icon">
              ⏱️
            </div>

            <div>
              <span>
                Estimated Preparation Time
              </span>

              <strong>
                15 – 20 Minutes
              </strong>
            </div>

          </div>
        )}


        {/* Items */}

        {order.items && order.items.length > 0 && (
          <div className="items-section">

            <h2>🛒 Your Order</h2>

            {order.items.map((item, index) => (
              <div
                className="track-item"
                key={index}
              >
                <div>
                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    × {item.qty}
                  </span>
                </div>

                <strong>
                  ₹{item.price * item.qty}
                </strong>
              </div>
            ))}

          </div>
        )}


        {/* Bottom */}

        <div className="track-bottom">

          <button
            className="track-home-btn"
            onClick={() => navigate("/")}
          >
            🏠 Back To Home
          </button>

          <p>
            Fresh food is worth the wait ❤️
          </p>

        </div>

      </div>

    </div>
  );
}

export default TrackOrder;