import React, { useEffect, useState } from "react";

const QuotationList = () => {
  const [quotations, setQuotations] = useState([]);
  const [error, setError] = useState("");
  const role = sessionStorage.getItem("role"); // Determine role
  const vendorId = sessionStorage.getItem("vendor_id"); // Vendor ID, if applicable

  useEffect(() => {
    // Fetch Quotations based on the role
    const endpoint =
      role === "customer"
        ? "http://127.0.0.1:8000/customer/quotations"
        : `http://127.0.0.1:8000/vendor/quotations?vendor_id=${vendorId}`;

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Quotations");
        }
        return response.json();
      })
      .then((data) => setQuotations(data))
      .catch((err) => setError(err.message));
  }, [role, vendorId]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>{role === "customer" ? "Received Quotations" : "Submitted Quotations"}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>RFQ ID</th>
            <th>Supplier</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation) => (
            <tr key={quotation.id}>
              <td>{quotation.id}</td>
              <td>{quotation.rfq_id}</td>
              <td>{quotation.supplier}</td>
              <td>{quotation.price}</td>
              <td>{quotation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuotationList;
