import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  Descriptions,
  Empty,
  Spin,
  message,
  Space,
} from "antd";
import { BarcodeOutlined, SearchOutlined } from "@ant-design/icons";
import { getProductByBarcode } from "../../services/productService";
import Barcode from "react-barcode";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!barcode) {
      message.warning("Lütfen bir barkod girin");
      return;
    }

    setLoading(true);
    try {
      const data = await getProductByBarcode(barcode);
      setProduct(data);
    } catch (error) {
      message.error("Ürün bulunamadı");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 24 }}>Barkod Tarama</h1>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Barkod girin"
            prefix={<BarcodeOutlined />}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            style={{ width: 300 }}
            onPressEnter={handleSearch}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Ara
          </Button>
        </Space>

        <div style={{ marginTop: 32 }}>
          {loading ? (
            <Spin size="large" />
          ) : product ? (
            <Descriptions
              bordered
              title="Ürün Bilgisi"
              column={1}
              labelStyle={{ width: "150px" }}
            >
              <Descriptions.Item label="Ürün Adı">
                {product.urun_adi}
              </Descriptions.Item>
              <Descriptions.Item label="Barkod">
                {product.barkodu}
              </Descriptions.Item>
              <Descriptions.Item label="Fiyat">
                {product.fiyati} ₺
              </Descriptions.Item>
              <Descriptions.Item label="Adet">
                {product.adeti}
              </Descriptions.Item>
              <Descriptions.Item label="Kategori">
                {product.kategorisi}
              </Descriptions.Item>
              <Descriptions.Item label="Barkod Görseli">
                <div style={{ textAlign: "center" }}>
                  <Barcode value={product.barkodu} />
                </div>
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Empty description="Ürün bulunamadı" />
          )}
        </div>
      </Card>
    </div>
  );
};

export default BarcodeScanner;
