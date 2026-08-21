import Policies from "./pages/Policies";
import BackToTop from "./components/BackToTop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import TrackOrder from "./pages/TrackOrder";
import Admin from "./pages/Admin";
import Success from "./pages/Success";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState("");

  const location = useLocation();

  return (
    <>
      {/* Navbar sirf user pages par dikhegi */}
      {location.pathname !== "/admin" && (
        <Navbar
          cart={cart}
          showCart={showCart}
          setShowCart={setShowCart}
        />
      )}

      {toast && <div className="toast">{toast}</div>}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              showCart={showCart}
              setShowCart={setShowCart}
              toast={toast}
              setToast={setToast}
            />
          }
        />

        <Route
          path="/checkout"
          element={<Checkout cart={cart} />}
        />

        <Route
          path="/success"
          element={<Success />}
        />

        <Route
          path="/track"
          element={<TrackOrder />}
        />
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>
        
        <Route
        path="/login"
        element={<Login />}
        />

        <Route path="/my-orders" element={<MyOrders />} />
        <Route
  path="/contact"
  element={<Contact />}
/>
<Route
  path="/about"
  element={<About />}
/>
<Route
  path="/policies"
  element={<Policies />}
/>
        
      </Routes>

      <BackToTop />
    </>
  );
}

export default App;