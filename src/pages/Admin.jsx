import newOrderSound from "../assets/new-order.mp3";
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/Admin.css";

function Admin() {
  const [time, setTime] = useState(Date.now());
  const [notification, setNotification] = useState("");
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Sound reference
  const soundRef = useRef(null);

  // Notification timeout reference
  const notificationTimerRef = useRef(null);

  // -----------------------------
  // Load Orders
  // -----------------------------

  const loadOrders = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`
      );

      if (!res.ok) {
        throw new Error("Failed to load orders");
      }

      const data = await res.json();

      setOrders(data);
    } catch (err) {
      console.log("❌ Load Orders Error:", err);
    }
  };

  // -----------------------------
  // Initial Orders
  // -----------------------------

  useEffect(() => {
    loadOrders();
  }, []);

  // -----------------------------
  // Order Timer
  // -----------------------------

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // -----------------------------
  // Enable Notification Sound
  // -----------------------------

  const enableSound = async () => {
    try {
      const audio = new Audio(newOrderSound);

      audio.volume = 1;

      await audio.play();

      audio.pause();
      audio.currentTime = 0;

      soundRef.current = audio;

      setSoundEnabled(true);

      console.log("🔊 Notification Sound Enabled");
    } catch (err) {
      console.log("🔇 Sound could not be enabled:", err);
    }
  };

  // -----------------------------
  // Play Notification Sound
  // -----------------------------

  const playNotificationSound = () => {
    try {
      const audio = soundRef.current;

      if (!audio) {
        console.log("🔇 Sound is not enabled yet");
        return;
      }

      audio.currentTime = 0;

      audio.play().catch((err) => {
        console.log("🔇 Notification sound blocked:", err);
      });
    } catch (err) {
      console.log("🔇 Sound Error:", err);
    }
  };

  // -----------------------------
  // Socket.IO
  // -----------------------------

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);

    socket.on("connect", () => {
      console.log("🟢 Admin Socket Connected");
    });

    // -----------------------------
    // New Order
    // -----------------------------

    socket.on("NEW_ORDER", (newOrder) => {
      console.log("🆕 New Order Received");

      // Add new order immediately
      setOrders((prevOrders) => {
        const exists = prevOrders.some(
          (order) => order._id === newOrder._id
        );

        if (exists) {
          return prevOrders;
        }

        return [newOrder, ...prevOrders];
      });

      // Play sound
      playNotificationSound();

      // Show notification
      setNotification(
        `🔔 New Order #${newOrder._id.slice(-6).toUpperCase()} Received!`
      );

      // Clear previous timeout
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }

      // Hide notification after 5 sec
      notificationTimerRef.current = setTimeout(() => {
        setNotification("");
      }, 5000);
    });

    // -----------------------------
    // Order Status Updated
    // -----------------------------

    socket.on("ORDER_STATUS_UPDATED", (updatedOrder) => {
      console.log("🔄 Order Status Updated");

      if (updatedOrder.status === "Delivered") {
        // Remove delivered order
        setOrders((prevOrders) =>
          prevOrders.filter(
            (order) => order._id !== updatedOrder._id
          )
        );
      } else {
        // Update order
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id
              ? updatedOrder
              : order
          )
        );
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Admin Socket Disconnected");
    });

    return () => {
      socket.disconnect();

      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  // -----------------------------
  // Timer
  // -----------------------------

  const getTimer = (createdAt) => {
    const createdTime = new Date(createdAt).getTime();

    const diff = Math.max(0, time - createdTime);

    const min = Math.floor(diff / 60000);

    const sec = Math.floor((diff % 60000) / 1000);

    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  // -----------------------------
  // Timer Color
  // -----------------------------

  const getColor = (createdAt) => {
    const createdTime = new Date(createdAt).getTime();

    const diff = Math.max(0, time - createdTime);

    if (diff < 600000) {
      return "green";
    }

    if (diff < 900000) {
      return "orange";
    }

    return "red";
  };

  // -----------------------------
  // Update Status
  // -----------------------------

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Status update failed");
      }

      const data = await res.json();

      // Backend response ke andar actual order hai
      const updatedOrder = data.order;

      if (!updatedOrder) {
        throw new Error("Updated order not received");
      }

      if (status === "Delivered") {
        setOrders((prevOrders) =>
          prevOrders.filter(
            (order) => order._id !== id
          )
        );
      } else {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id
              ? updatedOrder
              : order
          )
        );
      }
    } catch (err) {
      console.log("❌ Status Update Error:", err);
    }
  };

  // -----------------------------
  // Search + Filter
  // -----------------------------

  const filteredOrders = orders.filter((order) => {
    const customer =
      order.customer?.toLowerCase() || "";

    const phone = order.phone || "";

    const searchValue = search.toLowerCase();

    const matchesSearch =
      customer.includes(searchValue) ||
      phone.includes(search);

    const matchesFilter =
      filter === "All" ||
      order.status === filter;

    return matchesSearch && matchesFilter;
  });

  // -----------------------------
  // RETURN
  // -----------------------------

  return (
    <div className="admin-container">

      {/* =========================
          SOUND BUTTON
      ========================== */}

      <button
        onClick={enableSound}
        style={{
          position: "fixed",
          top: "20px",
          right: "25px",
          zIndex: 10000,

          padding: "10px 16px",

          border: "none",
          borderRadius: "8px",

          background: soundEnabled
            ? "#16a34a"
            : "#111827",

          color: "white",

          cursor: "pointer",

          fontWeight: "bold",

          boxShadow:
            "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {soundEnabled
          ? "🔊 Sound ON"
          : "🔇 Enable Sound"}
      </button>

      {/* =========================
          NEW ORDER NOTIFICATION
      ========================== */}

      {notification && (
        <div
          style={{
            position: "fixed",

            top: "75px",
            right: "25px",

            zIndex: 9999,

            background: "#111827",

            color: "white",

            padding: "16px 22px",

            borderRadius: "10px",

            boxShadow:
              "0 5px 20px rgba(0,0,0,0.25)",

            fontWeight: "bold",

            minWidth: "250px",

            textAlign: "center",
          }}
        >
          {notification}
        </div>
      )}

      {/* =========================
          SIDEBAR
      ========================== */}

      <AdminSidebar />

      {/* =========================
          CONTENT
      ========================== */}

      <div className="admin-content">

        <h1>
          🍔 Y&Y Veg Grill Admin Panel
        </h1>

        {/* =========================
            DASHBOARD
        ========================== */}

        <div className="dashboard-grid">

          <div className="dashboard-card green">
            <h2>
              {orders.length}
            </h2>

            <p>Total Orders</p>
          </div>

          <div className="dashboard-card orange">
            <h2>
              {
                orders.filter(
                  (o) =>
                    o.status === "Pending"
                ).length
              }
            </h2>

            <p>Pending</p>
          </div>

          <div className="dashboard-card blue">
            <h2>
              {
                orders.filter(
                  (o) =>
                    o.status === "Preparing"
                ).length
              }
            </h2>

            <p>Preparing</p>
          </div>

          <div className="dashboard-card purple">
            <h2>
              ₹
              {orders.reduce(
                (sum, o) =>
                  sum +
                  Number(o.total || 0),
                0
              )}
            </h2>

            <p>Sales</p>
          </div>

          <div className="dashboard-card red">
            <h2>
              ₹
              {orders
                .filter(
                  (o) => o.payment === "UPI"
                )
                .reduce(
                  (sum, o) =>
                    sum +
                    Number(o.total || 0),
                  0
                )}
            </h2>

            <p>UPI sales</p>
          </div>

        </div>

        {/* =========================
            LIVE ORDERS
        ========================== */}

        <h2 className="live-title">
          📦 Live Orders
        </h2>

        {/* =========================
            SEARCH + FILTER
        ========================== */}

        <div className="top-controls">

          <input
            type="text"
            placeholder="🔍 Search Customer / Phone"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="search-box"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="filter-box"
          >
            <option value="All">
              All
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Preparing">
              Preparing
            </option>

            <option value="Ready">
              Ready
            </option>

            <option value="Delivered">
              Delivered
            </option>
          </select>

        </div>

        {/* =========================
            ORDER GRID
        ========================== */}

        <div className="orders-grid">

          {filteredOrders.length === 0 ? (
            <p>
              No active orders found.
            </p>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="order-card"
              >

                <h3>
                  Order #
                  {order._id
                    .slice(-6)
                    .toUpperCase()}
                </h3>

                <p>
                  <b>
                    Customer:
                  </b>{" "}
                  {order.customer}
                </p>

                <p>
                  <b>Phone:</b>{" "}
                  {order.phone}
                </p>

                <p>
                  <b>Table:</b>{" "}
                  {order.tableNumber ||
                    "Not Provided"}
                </p>

                <p>
                  <b>
                    Payment:
                  </b>{" "}
                  {order.payment}
                </p>

                <p>
                  <b>Total:</b> ₹
                  {order.total}
                </p>

                {order.instructions && (
                  <p>
                    <b>
                      🍽️ Instructions:
                    </b>{" "}
                    {order.instructions}
                  </p>
                )}

                <hr />

                <h4>
                  Items
                </h4>

                {order.items.map(
                  (item, index) => (
                    <p key={index}>
                      {item.name} ×{" "}
                      {item.qty}
                    </p>
                  )
                )}

                <hr />

                {/* =========================
                    TIMER
                ========================== */}

                <h3
                  style={{
                    color: getColor(
                      order.createdAt
                    ),
                  }}
                >
                  ⏱{" "}
                  {getTimer(
                    order.createdAt
                  )}
                </h3>

                <h3>
                  Status :{" "}
                  {order.status}
                </h3>

                {/* =================
                    BUTTONS
                ================== */}

                <div className="btn-group">

                  <button
                    className="prepare-btn"
                    onClick={() =>
                      updateStatus(
                        order._id,
                        "Preparing"
                      )
                    }
                  >
                    Preparing
                  </button>

                  <button
                    className="ready-btn"
                    onClick={() =>
                      updateStatus(
                        order._id,
                        "Ready"
                      )
                    }
                  >
                    Ready
                  </button>

                  <button
                    className="deliver-btn"
                    onClick={() =>
                      updateStatus(
                        order._id,
                        "Delivered"
                      )
                    }
                  >
                    Delivered
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Admin;