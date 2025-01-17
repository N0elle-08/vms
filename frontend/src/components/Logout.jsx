import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/layout.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const role = sessionStorage.getItem("role");
  const vendorId = sessionStorage.getItem("vendor_id"); // Retrieve Vendor ID from sessionStorage

  return (
    <div className="layout-container">
      {/* App Header */}
      <header className="app-header">
        <h1>System Name</h1> {/* Replace "System Name" with your application/system name */}
        <div className="header-actions">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <h3>{role === "vendor" ? `Vendor ID: ${vendorId}` : "Customer Menu"}</h3>
        <ul>
          {role === "customer" && (
            <>
              <li className={location.pathname.includes("/customer/dashboard") ? "active" : ""}>
                <Link to="/customer/dashboard">Dashboard</Link>
              </li>
              <li className={location.pathname.includes("/customer/prs") ? "active" : ""}>
                <Link to="/customer/prs">Purchase Requests</Link>
              </li>
              <li className={location.pathname.includes("/customer/rfqs") ? "active" : ""}>
                <Link to="/customer/rfqs">RFQs</Link>
              </li>
              <li className={location.pathname.includes("/customer/quotations") ? "active" : ""}>
                <Link to="/customer/quotations">Quotations</Link>
              </li>
            </>
          )}
          {role === "vendor" && (
            <>
              <li className={location.pathname.includes("/vendor/dashboard") ? "active" : ""}>
                <Link to="/vendor/dashboard">Dashboard</Link>
              </li>
              <li className={location.pathname.includes("/vendor/rfqs") ? "active" : ""}>
                <Link to="/vendor/rfqs">RFQs</Link>
              </li>
              <li className={location.pathname.includes("/vendor/quotations") ? "active" : ""}>
                <Link to="/vendor/quotations">Quotations</Link>
              </li>
            </>
          )}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content-container">{children}</main>
    </div>
  );
};

export default Layout;
