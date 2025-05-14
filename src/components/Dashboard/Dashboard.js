import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  ShoppingOutlined,
  WalletOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import { getAllProducts } from "../../services/productService";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        setTotalProducts(products.length);

        // Toplam stok değeri hesaplama (fiyat * adet)
        const value = products.reduce((acc, product) => {
          const fiyat = parseFloat(product.fiyati);
          const adet = parseFloat(product.adeti);
          return acc + (isNaN(fiyat) || isNaN(adet) ? 0 : fiyat * adet);
        }, 0);
        setTotalValue(value);

        // Düşük stok sayısı (adet < 5)
        const lowStock = products.filter((product) => {
          const adet = parseFloat(product.adeti);
          return !isNaN(adet) && adet < 5;
        }).length;
        setLowStockItems(lowStock);
      } catch (error) {
        console.error("Veri yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Kontrol Paneli</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Toplam Ürün"
              value={totalProducts}
              prefix={<ShoppingOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Toplam Stok Değeri"
              value={totalValue}
              precision={2}
              prefix={<WalletOutlined />}
              suffix="₺"
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Düşük Stok Ürünleri"
              value={lowStockItems}
              valueStyle={{ color: lowStockItems > 0 ? "#cf1322" : "#3f8600" }}
              prefix={<AlertOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
