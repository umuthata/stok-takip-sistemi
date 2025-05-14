import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  Tag,
  Popconfirm,
  message,
  Card,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  getAllProducts,
  deleteProduct,
} from "../../services/productService";
import ProductDetail from "./ProductDetail";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      message.error("Ürünler yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (barkodu) => {
    try {
      await deleteProduct(barkodu);
      message.success("Ürün silindi");
      fetchProducts();
    } catch (error) {
      console.error(error);
      message.error("Silme işlemi başarısız");
    }
  };

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "urun_adi",
      key: "urun_adi",
    },
    {
      title: "Barkod",
      dataIndex: "barkodu",
      key: "barkodu",
    },
    {
      title: "Fiyat",
      dataIndex: "fiyati",
      key: "fiyati",
    },
    {
      title: "Adet",
      dataIndex: "adeti",
      key: "adeti",
    },
    {
      title: "Kategori",
      dataIndex: "kategorisi",
      key: "kategorisi",
      render: (kategori) => <Tag color="blue">{kategori}</Tag>,
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditProductId(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Bu ürünü silmek istediğinize emin misiniz?"
            onConfirm={() => handleDelete(record.barkodu)} // 🔧 DİKKAT: id değil, barkodu!
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Ürün Listesi</h1>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Ara..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 300, marginRight: 16 }}
          />
          <Button icon={<ReloadOutlined />} onClick={fetchProducts}>
            Yenile
          </Button>
        </div>
        <Table
          rowKey="barkodu"
          loading={loading}
          columns={columns}
          dataSource={products.filter((item) =>
            item.urun_adi.toLowerCase().includes(searchText.toLowerCase())
          )}
        />
      </Card>

      {editProductId && (
        <ProductDetail
          visible={isModalVisible}
          product={editProductId}
          onClose={() => {
            setEditProductId(null);
            setIsModalVisible(false);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
};

export default ProductList;
