import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreateQuotation = () => {
  const { id } = useParams(); // RFQ ID from URL
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Open");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vendorId = sessionStorage.getItem("vendor_id");

    try {
      const response = await fetch("http://127.0.0.1:8000/vendor/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rfq_id: id, supplier: vendorId, price, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to create quotation");
      }

      alert("Quotation created successfully!");
      navigate("/vendor/quotations");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create Quotation for RFQ {id}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="Submitted">Submitted</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateQuotation;
