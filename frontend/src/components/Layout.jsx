import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/layout.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const role = sessionStorage.getItem("role");
  const vendorId = sessionStorage.getItem("vendor_id"); // Retrieve Vendor ID from sessionStorage

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h3>{role === "vendor" ? `Vendor ID: ${vendorId}` : "Customer Menu"}</h3>
        <ul>
          {role === "customer" && (
            <>
              <li>
                <NavLink
                  to="/customer/dashboard"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customer/prs"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Purchase Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customer/rfqs"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  RFQs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customer/quotations"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Quotations
                </NavLink>
              </li>
            </>
          )}
          {role === "vendor" && (
            <>
              <li>
                <NavLink
                  to="/vendor/dashboard"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vendor/rfqs"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  RFQs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vendor/quotations"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Quotations
                </NavLink>
              </li>
            </>
          )}
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                textAlign: "left",
                padding: "10px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>
      <main className="content-container">{children}</main>
    </div>
  );
};

export default Layout;
