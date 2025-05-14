import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { register } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await register(values);
      message.success("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      navigate("/login");
    } catch (error) {
      message.error(error.message || "Kayıt başarısız");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Stok Takip Sistemi - Kayıt" style={{ width: 400 }}>
        <Form name="register" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Lütfen kullanıcı adınızı girin!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Kullanıcı Adı" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Lütfen email adresinizi girin!" },
              { type: "email", message: "Geçerli bir email adresi girin!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Lütfen şifrenizi girin!" },
              { min: 6, message: "Şifre en az 6 karakter olmalıdır!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Lütfen şifrenizi tekrar girin!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Şifreler eşleşmiyor!");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Şifreyi Tekrar Girin"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Kayıt Ol
            </Button>
            <div style={{ marginTop: 16, textAlign: "center" }}>
              Zaten hesabınız var mı? <Link to="/login">Giriş yap</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
