import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./Success.css";

function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

 const downloadBill = () => {
  if (!order) return;

  const pdf = new jsPDF();

  const pageWidth = 210;
  const orderId =
    `YVG-${order._id.slice(-6).toUpperCase()}`;

  const grandTotal = Math.round(Number(order.total || 0));
  const gst = Math.round(grandTotal - grandTotal / 1.05);
  const subtotal = grandTotal - gst;

  // =========================
  // PREMIUM HEADER
  // =========================

  pdf.setFillColor(255, 87, 34);
  pdf.rect(0, 0, pageWidth, 48, "F");

  pdf.setTextColor(255, 255, 255);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(25);

  pdf.text("Y&Y VEG GRILL", 20, 22);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  pdf.text(
    "Fresh Food • Premium Taste",
    20,
    31
  );

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);

  pdf.text(
    "E-BILL",
    190,
    22,
    { align: "right" }
  );

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);

  pdf.text(
    "ORDER CONFIRMED",
    190,
    31,
    { align: "right" }
  );


  // =========================
  // ORDER INFORMATION
  // =========================

  pdf.setTextColor(55, 55, 55);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);

  pdf.text("ORDER DETAILS", 20, 65);

  pdf.setDrawColor(230, 230, 230);
  pdf.line(20, 69, 190, 69);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  pdf.text("Order ID", 20, 80);
  pdf.text(orderId, 65, 80);

  pdf.text("Customer", 20, 89);
  pdf.text(order.customer || "-", 65, 89);

  pdf.text("Phone", 20, 98);
  pdf.text(order.phone || "-", 65, 98);

  pdf.text("Payment", 20, 107);
  pdf.text(order.payment || "Cash", 65, 107);


  // =========================
  // ITEMS
  // =========================

  let y = 125;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);

  pdf.text("YOUR ORDER", 20, y);

  y += 8;

  pdf.setFillColor(248, 248, 248);
  pdf.roundedRect(
    18,
    y - 5,
    174,
    12,
    3,
    3,
    "F"
  );

  pdf.setTextColor(90, 90, 90);

  pdf.setFontSize(9);

  pdf.text("ITEM", 25, y + 3);
  pdf.text("QTY", 135, y + 3);
  pdf.text("AMOUNT", 165, y + 3);

  y += 17;

  pdf.setTextColor(45, 45, 45);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  if (order.items && order.items.length > 0) {

    order.items.forEach((item) => {

      const qty = Number(item.qty || 0);
      const price = Number(item.price || 0);

      const itemTotal = qty * price;

      pdf.text(
        item.name,
        25,
        y
      );

      pdf.text(
        String(qty),
        138,
        y
      );

      pdf.text(
        `Rs. ${itemTotal}`,
        165,
        y
      );

      pdf.setDrawColor(240, 240, 240);

      pdf.line(
        25,
        y + 5,
        185,
        y + 5
      );

      y += 12;
    });
  }


  // =========================
  // BILL SUMMARY
  // =========================

  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  pdf.text(
    "Subtotal",
    125,
    y
  );

  pdf.text(
    `Rs. ${subtotal}`,
    185,
    y,
    { align: "right" }
  );

  y += 9;

  pdf.text(
    "GST (5%)",
    125,
    y
  );

  pdf.text(
    `Rs. ${gst}`,
    185,
    y,
    { align: "right" }
  );

  y += 7;

  pdf.setDrawColor(220, 220, 220);
  pdf.line(120, y, 190, y);

  y += 13;


  // =========================
  // GRAND TOTAL BOX
  // =========================

  pdf.setFillColor(255, 87, 34);

  pdf.roundedRect(
    112,
    y - 7,
    78,
    24,
    4,
    4,
    "F"
  );

  pdf.setTextColor(255, 255, 255);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);

  pdf.text(
    "GRAND TOTAL",
    118,
    y + 3
  );

  pdf.setFontSize(15);

  pdf.text(
    `Rs. ${grandTotal}`,
    185,
    y + 4,
    { align: "right" }
  );


  // =========================
  // PREPARATION BOX
  // =========================

  y += 42;

  pdf.setFillColor(255, 247, 242);

  pdf.roundedRect(
    20,
    y,
    170,
    27,
    5,
    5,
    "F"
  );

  pdf.setTextColor(100, 100, 100);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);

  pdf.text(
    "ESTIMATED PREPARATION TIME",
    30,
    y + 10
  );

  pdf.setTextColor(255, 87, 34);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);

  pdf.text(
    "15 - 20 Minutes",
    30,
    y + 20
  );


  // =========================
  // FOOTER
  // =========================

  pdf.setTextColor(130, 130, 130);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);

  pdf.text(
  "Thank you for ordering from Y&Y Veg Grill",
  pageWidth / 2,
  275,
  { align: "center" }
);

  pdf.setFontSize(8);

 pdf.setTextColor(255, 87, 34);
pdf.setFont("helvetica", "bold");
pdf.setFontSize(10);

pdf.text(
  "Made with care for you",
  pageWidth / 2,
  282,
  { align: "center" }
);

  pdf.setTextColor(180, 180, 180);

  pdf.text(
    "This is a computer generated e-bill.",
    pageWidth / 2,
    290,
    { align: "center" }
  );


  // =========================
  // DOWNLOAD
  // =========================

  pdf.save(`${orderId}-E-Bill.pdf`);
};

  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <div className="success-badge">
          ORDER CONFIRMED
        </div>

        <h1>Order Placed Successfully!</h1>

        <h2>
          Thank You For Ordering ❤️
        </h2>

        <p className="success-message">
          Your delicious order has been received and is now
          being prepared with care.
        </p>

        {order && (
          <div className="order-id-box">

            <span>YOUR ORDER ID</span>

            <strong>
              YVG-{order._id.slice(-6).toUpperCase()}
            </strong>

          </div>
        )}

        <div className="time-box">

          <div className="time-icon">
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

        {/* E-BILL */}

        {order && (
          <button
            className="bill-btn"
            onClick={downloadBill}
          >
            📄 Download E-Bill PDF
          </button>
        )}

        <div className="success-actions">

          <button
            className="track-btn"
            onClick={() =>
              navigate("/track", {
                state: {
                  orderId: order?._id,
                },
              })
            }
          >
            📦 Track Order
          </button>

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            🏠 Back To Home
          </button>

        </div>

        <p className="bottom-text">
          Fresh food is on the way to you ❤️
        </p>

      </div>

    </div>
  );
}

export default Success;