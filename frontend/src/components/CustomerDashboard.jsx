import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const [prsCount, setPRsCount] = useState(0);
  const [rfqCount, setRFQCount] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch metrics for customer dashboard
    Promise.all([
      fetch("http://127.0.0.1:8000/customer/prs").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch PRs");
        return res.json();
      }),
      fetch("http://127.0.0.1:8000/customer/rfqs").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch RFQs");
        return res.json();
      }),
    ])
      .then(([prs, rfqs]) => {
        setPRsCount(prs.length);
        setRFQCount(rfqs.length);
      })
      .catch(() => setError("Failed to load dashboard metrics"));
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session data
    navigate("/"); // Redirect to login page
  };

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => window.location.reload()} style={styles.button}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Customer Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
      <div className="tiles-container" style={styles.tilesContainer}>
        <Tile
          title="Purchase Requests"
          count={prsCount}
          navigateTo="/customer/prs"
        />
        <Tile title="RFQs" count={rfqCount} navigateTo="/customer/rfqs" />
        {/* Uncomment and use if quotations functionality is added */}
        {/* <Tile title="Quotations" count={quotationCount} navigateTo="/customer/quotations" /> */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  tilesContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  logoutButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  logoutButtonHover: {
    backgroundColor: "#a71d2a",
  },
};

export default CustomerDashboard;
