import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const [rfqs, setRFQs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const vendorId = sessionStorage.getItem("vendor_id"); // Retrieve logged-in Vendor ID
  const navigate = useNavigate();

  useEffect(() => {
    if (!vendorId) {
      setError("Vendor not logged in. Please log in again.");
      setLoading(false);
      return;
    }

    // Fetch RFQs for the logged-in Vendor
    fetch(`http://127.0.0.1:8000/vendor/rfqs?vendor_id=${vendorId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch RFQs.");
        }
        return response.json();
      })
      .then((data) => setRFQs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [vendorId]);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session data
    navigate("/"); // Navigate to login page
  };

  const handleTileClick = (path) => {
    navigate(path);
  };

  if (loading) {
    return <p className="loading">Loading RFQs...</p>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="tiles-container">
        <Tile title="RFQs" count={rfqs.length} navigateTo="/vendor/rfqs" />
        <Tile title="Quotations" navigateTo="/vendor/quotations" />
      </div>
      {rfqs.length === 0 && <p className="no-data-message">No RFQs found for you.</p>}
    </div>
  );
};

export default VendorDashboard;
