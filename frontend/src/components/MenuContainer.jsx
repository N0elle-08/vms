//NOT IN USE

import React from "react";
import { Link } from "react-router-dom";
import "../styles/menu.css"; // Import the menu-specific styles

const MenuContainer = () => {
  const role = sessionStorage.getItem("role"); // Get the logged-in user's role
  const dashboardPath = role === "customer" ? "/customer/dashboard" : "/vendor/dashboard";

  return (
    <div className="menu-container">
      <ul>
        <li>
          <Link to={dashboardPath}>Dashboard</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuContainer;
