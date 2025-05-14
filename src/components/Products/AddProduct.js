import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Select, message, Card } from "antd";
import { BarcodeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { addProduct } from "../../services/productService";

const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await addProduct(values);
      message.success("Ürün başarıyla eklendi!");
      form.resetFields();
    } catch (error) {
      message.error("Ürün eklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Yeni Ürün Ekle</h1>
      <Card>
        <Form form={form} name="addProduct" layout="vertical" onFinish={onFinish}>
          <Form.Item name="urun_adi" label="Ürün Adı" rules={[{ required: true }]}>
            <Input prefix={<ShoppingOutlined />} placeholder="Ürün adı" />
          </Form.Item>
          <Form.Item name="barkodu" label="Barkodu" rules={[{ required: true }]}>
            <Input prefix={<BarcodeOutlined />} placeholder="Barkod" />
          </Form.Item>
          <Form.Item name="fiyati" label="Fiyat" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Fiyat" />
          </Form.Item>
          <Form.Item name="adeti" label="Adeti" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Adet" />
          </Form.Item>
          <Form.Item name="kategorisi" label="Kategori" rules={[{ required: true }]}>
            <Select placeholder="Kategori seç">
              <Option value="Elektronik">Elektronik</Option>
              <Option value="Giyim">Giyim</Option>
              <Option value="Kırtasiye">Kırtasiye</Option>
              <Option value="Temizlik">Temizlik</Option>
              <Option value="Gıda">Gıda</Option>
              <Option value="Mobilya">Mobilya</Option>
              <Option value="Oyuncak">Oyuncak</Option>
              <Option value="Kozmetik">Kozmetik</Option>
              <Option value="Diğer">Diğer</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>Ekle</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddProduct;
