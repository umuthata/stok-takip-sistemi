import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider, AuthContext } from "./utils/authContext";

// Bileşenleri import et
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import ProductList from "./components/Products/ProductList";
import AddProduct from "./components/Products/AddProduct";
import BarcodeScanner from "./components/Products/BarcodeScanner";
import StockMail from "./components/Products/StockMail";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";

import "antd/dist/antd.css";

import "./App.css";

const { Content } = Layout;

// Korumalı Rota Bileşeni
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout style={{ minHeight: "100vh" }}>
                  <Sidebar />
                  <Layout className="site-layout">
                    <Navbar />
                    <Content style={{ margin: "0 16px" }}>
                      <Routes>
                        <Route
                          path="/"
                          element={<Navigate to="/dashboard" />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/barcode" element={<BarcodeScanner />} />
                        <Route path="/stock-mail" element={<StockMail />} />
                      </Routes>
                    </Content>
                  </Layout>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
