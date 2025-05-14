import React, { useContext } from "react";
import { Layout, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../../utils/authContext";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 8px", 
        backgroundColor: "#001529", 
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          marginLeft: "4px", 
        }}
      >
        📦 Stok Takip Sistemi
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ color: "white", marginRight: 15 }}>
          <UserOutlined /> {user?.username}
        </span>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ color: "white" }}
        >
          Çıkış
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
