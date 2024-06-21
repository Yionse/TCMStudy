import { useContext } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  LockOutlined,
  QqOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Radio, message } from "antd";
import Password from "antd/es/input/Password";
import { useForm } from "antd/es/form/Form";
import { TabContext } from "@/contexts/TabContextProvide";
import { fetchRegister } from "@/apis/user";

export default function Register() {
  const [registerForm] = useForm();
  const { setTabKey } = useContext(TabContext);
  const { mutateAsync } = fetchRegister();

  const onFinish = async () => {
    const { username, name, phone, password, gender } =
      registerForm.getFieldsValue();
    await mutateAsync({
      username,
      name,
      phone,
      password,
      gender,
    });
    message.success("注册成功");
    setTabKey("login");
  };

  return (
    <>
      <Form
        labelAlign="left"
        labelCol={{ span: 4 }}
        className="w-full"
        form={registerForm}
        onFinish={onFinish}
        initialValues={{ gender: "1" }}
      >
        <Form.Item
          name="username"
          label="账号"
          rules={[{ required: true, message: "请输入账号" }]}
        >
          <Input placeholder="账号" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="name"
          label="昵称"
          rules={[{ required: true, message: "请输入昵称" }]}
        >
          <Input placeholder="昵称" prefix={<QqOutlined />} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号码"
          rules={[
            { required: true, message: "请收入手机号码" },
            { max: 11, message: "请输入正确的手机号码" },
            { min: 11, message: "请输入正确的手机号码" },
          ]}
        >
          <Input
            type="Number"
            placeholder="手机号码"
            prefix={<KeyOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: "请输入密码" },
            { max: 16, message: "密码最长16位" },
            { min: 6, message: "密码最短6位" },
          ]}
          colon
        >
          <Password
            type="password"
            prefix={<LockOutlined />}
            placeholder={`请输入密码`}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="确认密码"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请再次输入密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
          colon
        >
          <Password
            type="password"
            prefix={<LockOutlined />}
            placeholder={`请再次输入密码`}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name={"gender"}
          label="性别"
          colon
          rules={[{ required: true }]}
        >
          <Radio.Group defaultValue={"1"}>
            <Radio value="1">男</Radio>
            <Radio value="0">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item className="text-center" label="">
          <Button type="primary" htmlType="submit" className="w-full">
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
