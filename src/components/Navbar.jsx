import "./navbar.css";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

function Navbar({ cart, showCart, setShowCart }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">

      <div className="nav-left">
        <img
          src={logo}
          alt="Y&Y Veg Grill Logo"
          className="logo"
        />

        <h2>Y&Y Veg Grill</h2>
      </div>

      <ul className="nav-links">

        <li onClick={() => navigate("/")}>
          Home
        </li>

        <li
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              document
                .querySelector(".popular")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }, 100);
          }}
        >
          Menu
        </li>

       <li onClick={() => navigate("/about")}>
  About
</li>

        <li onClick={() => navigate("/contact")}>
  Contact
</li>
<li
  onClick={() => navigate("/policies")}
  style={{ cursor: "pointer" }}
>
  📋 Policies
</li>

        <li
          onClick={() => navigate("/my-orders")}
          style={{ cursor: "pointer" }}
        >
          📦 My Orders
        </li>

        <li
          onClick={() => setShowCart(!showCart)}
          style={{ cursor: "pointer" }}
        >
          🛒 Cart (
          {cart.reduce(
            (total, item) => total + item.quantity,
            0
          )}
          )
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;