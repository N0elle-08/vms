import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("customer");
  const [vendorId, setVendorId] = useState(""); // For Vendor ID input
  const [error, setError] = useState(""); // To handle errors
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (role === "customer") {
      sessionStorage.setItem("role", "customer");
      navigate("/customer/dashboard");
    } else if (role === "vendor") {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/vendor/login?vendor_id=" + encodeURIComponent(vendorId),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: "",
          }
        );

        if (!response.ok) {
          throw new Error("Invalid Vendor ID");
        }

        const data = await response.json();
        console.log("Login successful:", data);

        sessionStorage.setItem("role", "vendor");
        sessionStorage.setItem("vendor_id", vendorId);
        navigate("/vendor/dashboard");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>

        {role === "vendor" && (
          <div style={styles.formGroup}>
            <label style={styles.label}>Vendor ID:</label>
            <input
              type="text"
              placeholder="Enter Vendor ID"
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
              style={styles.input}
            />
          </div>
        )}

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    fontSize: "1.5rem",
    color: "#333",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "1rem",
    color: "#555",
  },
  select: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    marginTop: "1rem",
    color: "red",
    fontSize: "0.9rem",
  },
};

export default Login;
