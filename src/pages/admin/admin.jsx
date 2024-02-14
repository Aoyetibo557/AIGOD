import React from "react";
import "./admin.css";
import AdminDashboard from "../../components/admin/admindashboard";
import Layout from "../../components/Layout/layout";

const AdminPage = () => {
  return (
    <Layout>
      <div className="admin__container">
        <AdminDashboard />
      </div>
    </Layout>
  );
};

export default AdminPage;
