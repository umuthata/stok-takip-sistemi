import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  BarcodeOutlined,
  PlusOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Kontrol Paneli",
    },
    {
      key: "products",
      icon: <AppstoreOutlined />,
      label: "Ürün Listesi",
    },
    {
      key: "add-product",
      icon: <PlusOutlined />,
      label: "Ürün Ekle",
    },
    {
      key: "barcode",
      icon: <BarcodeOutlined />,
      label: "Barkod Tarama",
    },
    {
      key: "stock-mail",
      icon: <MailOutlined />,
      label: "Stok Bildirim",
    },
  ];

  const getSelectedKey = () => {
    const path = location.pathname.split("/")[1] || "dashboard";
    return path;
  };

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ minHeight: "100vh" }}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        onClick={handleMenuClick}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
