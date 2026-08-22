import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">

      <div className="sidebar-brand">
        <div className="brand-logo">🍔</div>

        <div>
          <h2>Y&Y Veg Grill</h2>
          <span>ADMIN PANEL</span>
        </div>
      </div>

      <div className="sidebar-line"></div>

      <div className="admin-badge">
        <span className="online-dot"></span>
        Admin Dashboard
      </div>

      <button
        className="sidebar-logout"
        onClick={handleLogout}
      >
        <span>🚪</span>
        Logout
      </button>

    </aside>
  );
}

export default AdminSidebar;