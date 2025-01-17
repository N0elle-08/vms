import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CustomerDashboard from "./components/CustomerDashboard";
import VendorDashboard from "./components/VendorDashboard";
import RFQList from "./components/RFQList";
import PRList from "./components/PRList";
import QuotationList from "./components/QuotationList";
import CreateQuotation from "./components/CreateQuotation";
import RFQDetails from "./components/RFQDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // Import Layout

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login Page */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/customer/*"
          element={
            <ProtectedRoute roleRequired="customer">
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<CustomerDashboard />} />
                  <Route path="prs" element={<PRList />} />
                  <Route path="rfqs" element={<RFQList />} />
                  <Route path="quotations" element={<QuotationList />} />
                  <Route path="rfq-details/:id" element={<RFQDetails />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/*"
          element={
            <ProtectedRoute roleRequired="vendor">
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<VendorDashboard />} />
                  <Route path="rfqs" element={<RFQList />} />
                  <Route path="quotations" element={<QuotationList />} />
                  <Route path="rfqs/:id/create-quotation" element={<CreateQuotation />} />
                  <Route path="rfq-details/:rfqId" element={<RFQDetails />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
