import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RFQList = () => {
  const [rfqs, setRFQs] = useState([]);
  const [error, setError] = useState("");
  const role = sessionStorage.getItem("role"); // Determine role
  const vendorId = sessionStorage.getItem("vendor_id"); // Vendor ID, if applicable
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch RFQs based on the role
    const endpoint =
      role === "customer"
        ? "http://127.0.0.1:8000/customer/rfqs"
        : `http://127.0.0.1:8000/vendor/rfqs?vendor_id=${vendorId}`;

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch RFQs");
        }
        return response.json();
      })
      .then((data) => setRFQs(data))
      .catch((err) => setError(err.message));
  }, [role, vendorId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="rfq-list-container">
      <h1>{role === "customer" ? "Customer RFQs" : "Vendor RFQs"}</h1>
      <table className="rfq-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created By</th>
            <th>Creation Date</th>
            <th>Currency</th>
            <th>Publishing Date</th>
            <th>Submission Deadline</th>
            <th>Status</th>
            {role === "vendor" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {rfqs.map((rfq) => (
            <tr key={rfq.id}>
              <td>
                <button
                  onClick={() => navigate(`/${role}/rfq-details/${rfq.id}`)}
                  className="link-button"
                >
                  {rfq.id}
                </button>
              </td>
              <td>{rfq.name}</td>
              <td>{rfq.created_by}</td>
              <td>{rfq.creation_date}</td>
              <td>{rfq.currency}</td>
              <td>{rfq.publishing_date}</td>
              <td>{rfq.submission_deadline}</td>
              <td>{rfq.lifecycle_status}</td>
              {role === "vendor" && (
                <td>
                  <button
                    onClick={() =>
                      navigate(`/vendor/rfqs/${rfq.id}/create-quotation`)
                    }
                    className="action-button"
                  >
                    Create Quotation
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RFQList;
