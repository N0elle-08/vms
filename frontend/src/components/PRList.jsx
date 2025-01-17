import React, { useEffect, useState } from "react";
import "../styles/global.css";

const PRList = () => {
  const [prs, setPRs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch Purchase Requests from the backend
    fetch("http://127.0.0.1:8000/customer/prs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Purchase Requests");
        }
        return response.json();
      })
      .then((data) => setPRs(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Purchase Requests</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {prs.length > 0 ? (
              prs.map((pr) => (
                <tr key={pr.id}>
                  <td>{pr.id || "-"}</td>
                  <td>{pr.type || "-"}</td>
                  <td>{pr.description || "-"}</td>
                  <td>{pr.Note || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data-message">
                  No Purchase Requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PRList;
