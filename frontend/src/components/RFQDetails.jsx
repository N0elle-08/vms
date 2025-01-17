import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import "../styles/rfq.css";
import "../styles/global.css";

const RFQDetails = () => {
  const { rfqId } = useParams(); // Get RFQ ID from URL
  const role = sessionStorage.getItem("role"); // Get user role (customer/vendor)
  const baseUrl = role === "customer" ? "/customer" : "/vendor"; // Dynamic URL base

  const [data, setData] = useState({
    general: {},
    delivery: {},
    items: [],
    bidders: [],
  });
  const [error, setError] = useState("");
  const [showErrorBar, setShowErrorBar] = useState(false);

  const generalRef = useRef(null);
  const deliveryRef = useRef(null);
  const itemsRef = useRef(null);
  const biddersRef = useRef(null);

  const fetchData = async (endpoint) => {
    try {
      const apiBaseUrl = "http://127.0.0.1:8000";
      console.log("Fetching data from:", `${apiBaseUrl}${endpoint}`);
      const response = await fetch(`${apiBaseUrl}${endpoint}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      return await response.json();
    } catch (err) {
      setError("Failed to fetch details");
      setShowErrorBar(true);
      return null;
    }
  };

  useEffect(() => {
    const loadRFQDetails = async () => {
      console.log("RFQ ID:", rfqId);

      const generalInfo = await fetchData(`${baseUrl}/rfq/${rfqId}/general`);
      const items = await fetchData(`${baseUrl}/rfq/${rfqId}/items`);
      const bidders =
        role === "customer" ? await fetchData(`${baseUrl}/rfq/${rfqId}/bidders`) : [];

      setData({
        general: generalInfo || {},
        delivery: deliveryTerms || {},
        items: items || [],
        bidders: bidders || [],
      });
    };

    loadRFQDetails();
  }, [rfqId, role, baseUrl]);

  const handleTabChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        generalRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 1:
        deliveryRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 2:
        itemsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case 3:
        if (role === "customer") biddersRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="rfq-details">
      {/* Header Section */}
      <header className="rfq-header">
        <div className="rfq-title">
          <h1>{data.general?.RequestForQuotationName || "-"}</h1>
          <p>{rfqId || "-"}</p>
        </div>
        <div className="rfq-meta">
          <p>
            <strong>Created By:</strong> {data.general?.CreatedByUser || "-"}
          </p>
          <p>
            <strong>Created On:</strong> {data.general?.CreationDate || "-"}
          </p>
          <p>
            <strong>Status:</strong> {data.general?.RFQLifecycleStatus || "-"}
          </p>
          <p>
            <strong>Target Value:</strong>{" "}
            {data.general?.TargetAmount || "-"} USD
          </p>
          <p>
            <strong>Quotation Deadline:</strong>{" "}
            {data.general?.QuotationLatestSubmissionDate || "-"}
          </p>
        </div>
      </header>

      {/* Tabs */}
      <Tabs
        onChange={(event, value) => handleTabChange(event, value)}
        centered
        className="custom-tabs"
      >
        <Tab label="General Information" />
        <Tab label="Delivery & Payment Terms" />
        <Tab label="Items" />
        {role === "customer" && <Tab label="Bidders" />}
      </Tabs>

      {/* Sections in Card View */}
      <Box>
        {/* General Information Card */}
        <h2>General Information</h2>
        <div ref={generalRef} className="card">
          <div className="card-content">
            <p>
              <strong>Company Code:</strong> {data.general?.CompanyCode || "-"}
            </p>
            <p>
              <strong>Document Currency:</strong>{" "}
              {data.general?.DocumentCurrency || "-"}
            </p>
            <p>
              <strong>Publishing Date:</strong>{" "}
              {data.general?.RFQPublishingDate || "-"}
            </p>
          </div>
        </div>

        {/* Delivery Terms Card */}
        <h2>Delivery & Payment Terms</h2>
        <div ref={deliveryRef} className="card">
          <div className="card-content">
            <p>
              <strong>Delivery Date:</strong> {data.general?.QuotationLatestSubmissionDate || "-"}
            </p>
            <p>
              <strong>Payment Terms:</strong> {data.general?.DocumentCurrency || "-"}
            </p>
          </div>
        </div>

        {/* Items Card */}
        <h2>Items</h2>
        <div ref={itemsRef} className="card">
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.items.length > 0 ? (
                data.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id || "-"}</td>
                    <td>{item.description || "-"}</td>
                    <td>{item.quantity || "-"}</td>
                    <td>{item.price || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No items available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bidders Card (only for customers) */}
        {role === "customer" && (
          <div ref={biddersRef}>
            <h2>Bidders</h2>
            <div className="card">
              <table>
                <thead>
                  <tr>
                    <th>Bidder Name</th>
                    <th>Bid Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bidders.length > 0 ? (
                    data.bidders.map((bidder) => (
                      <tr key={bidder.name}>
                        <td>{bidder.name || "-"}</td>
                        <td>{bidder.amount || "-"}</td>
                        <td>{bidder.status || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        No bidders available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Box>

      {/* Error Bar */}
      {showErrorBar && (
        <div className="error-bar">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default RFQDetails;
