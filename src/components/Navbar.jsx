import "./navbar.css";
import logo from "../assets/logo.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ cart, showCart, setShowCart }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const goToMenu = () => {
    navigate("/");
    setMenuOpen(false);

    setTimeout(() => {
      document.querySelector(".popular")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

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

      {/* Desktop Menu */}
      <ul className="nav-links">

        <li onClick={() => goTo("/")}>Home</li>

        <li onClick={goToMenu}>Menu</li>

        <li onClick={() => goTo("/about")}>About</li>

        <li onClick={() => goTo("/contact")}>Contact</li>

        <li onClick={() => goTo("/policies")}>
          📋 Policies
        </li>

        <li onClick={() => goTo("/my-orders")}>
          📦 My Orders
        </li>

        <li onClick={() => setShowCart(!showCart)}>
          🛒 Cart (
          {cart.reduce(
            (total, item) => total + item.quantity,
            0
          )}
          )
        </li>

      </ul>

      {/* Mobile Hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">

          <button onClick={() => goTo("/")}>
            🏠 Home
          </button>

          <button onClick={goToMenu}>
            🍽️ Menu
          </button>

          <button onClick={() => goTo("/about")}>
            ℹ️ About
          </button>

          <button onClick={() => goTo("/contact")}>
            📞 Contact
          </button>

          <button onClick={() => goTo("/policies")}>
            📋 Policies
          </button>

          <button onClick={() => goTo("/my-orders")}>
            📦 My Orders
          </button>

          <button
            onClick={() => {
              setShowCart(!showCart);
              setMenuOpen(false);
            }}
          >
            🛒 Cart (
            {cart.reduce(
              (total, item) => total + item.quantity,
              0
            )}
            )
          </button>

        </div>
      )}

    </nav>
  );
}

export default Navbar;