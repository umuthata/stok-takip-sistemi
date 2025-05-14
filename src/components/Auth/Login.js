import React, { useState, useContext } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../services/authService";
import { AuthContext } from "../../utils/authContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await login(values);
      authLogin(data.user, data.token);
      message.success("Giriş başarılı!");
      navigate("/dashboard");
    } catch (error) {
      message.error(error.message || "Giriş başarısız");
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
      <Card title="Stok Takip Sistemi" style={{ width: 400 }}>
        <Form name="login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Lütfen kullanıcı adınızı girin!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Kullanıcı Adı" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Giriş Yap
            </Button>
            <div style={{ marginTop: 16, textAlign: "center" }}>
              Hesabınız yok mu? <Link to="/register">Kayıt ol</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
