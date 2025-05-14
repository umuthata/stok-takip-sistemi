import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, message } from "antd";
import { updateProduct } from "../../services/productService";

const { Option } = Select;

const ProductDetail = ({ visible, onClose, product }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // 🔧 GÜNCELLENEN SATIR:
      await updateProduct(product.barkodu, values);

      message.success("Ürün güncellendi!");
      onClose();
    } catch (error) {
      message.error("Güncelleme işlemi başarısız");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Ürün Bilgilerini Güncelle"
      onCancel={onClose}
      onOk={handleOk}
      confirmLoading={loading}
      okText="Güncelle"
      cancelText="İptal"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="urun_adi" label="Ürün Adı" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="barkodu" label="Barkod" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="fiyati" label="Fiyat" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="adeti" label="Adet" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="kategorisi" label="Kategori" rules={[{ required: true }]}>
          <Select>
            <Option value="Elektronik">Elektronik</Option>
            <Option value="Giyim">Giyim</Option>
            <Option value="Kırtasiye">Kırtasiye</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductDetail;
