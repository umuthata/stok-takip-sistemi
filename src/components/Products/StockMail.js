import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  message,
  Space,
  Spin,
  Checkbox,
} from "antd";
import { getAllProducts } from "../../services/productService";

const StockNotify = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mailContent, setMailContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const products = await getAllProducts();
      const low = products.filter((p) => parseFloat(p.adeti) < 5);
      setLowStockProducts(low);
    };
    fetch();
  }, []);

  const columns = [
    { title: "Ürün Adı", dataIndex: "urun_adi", key: "urun_adi" },
    { title: "Adet", dataIndex: "adeti", key: "adeti" },
    { title: "Kategori", dataIndex: "kategorisi", key: "kategorisi" },
  ];

  const handleMailClick = () => {
  const contentLines = selectedRows.map((item) => {
    return `- Ürün: ${item.urun_adi}\n  Adet: ${item.adeti}\n  Kategori: ${item.kategorisi}`;
  });

  const fullMessage =
    `Aşağıdaki ürünlerin stoğu azalmıştır:\n\n` +
    contentLines.join("\n\n") +
    `\n\nLütfen en kısa sürede tedarik edilmesini sağlayın.`;

  setMailContent(fullMessage);
  setIsModalOpen(true);
};


  const sendFakeMail = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      message.success("Mail başarıyla gönderildi ✅");
    }, 1500);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Düşük Stoklu Ürünler</h1>
      <Table
        rowKey="barkodu"
        columns={columns}
        dataSource={lowStockProducts}
        rowSelection={{
          type: "checkbox",
          onChange: (_, rows) => setSelectedRows(rows),
        }}
        pagination={{ pageSize: 5 }}
      />
      <Button
        type="primary"
        disabled={selectedRows.length === 0}
        onClick={handleMailClick}
        style={{ marginTop: 16 }}
      >
        📧 Seçilenlere Mail Gönder
      </Button>

      <Modal
        title="Mail İçeriği"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={sendFakeMail}
        okText="Gönder"
        cancelText="İptal"
        confirmLoading={loading}
      >
        {loading ? (
          <Spin />
        ) : (
          <Input.TextArea
            rows={6}
            value={mailContent}
            readOnly
            style={{ whiteSpace: "pre-line" }}
          />
        )}
      </Modal>
    </div>
  );
};

export default StockNotify;
