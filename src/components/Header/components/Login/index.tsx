import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext } from "react";
import { TabContext } from "@/contexts/TabContextProvide";
import { fetchLogin } from "@/apis/user";
import { UserInfoContext } from "@/contexts/UserInfo";
import { fetchTaskList } from "@/apis/operator";

export default function Login() {
  const [loginForm] = useForm();
  const { setTabKey, setOpen } = useContext(TabContext);
  const { setIsLoggedIn, setUserInfo } = useContext(UserInfoContext);
  const { mutateAsync } = fetchLogin();
  const { mutateAsync: taskList } = fetchTaskList();
  const handleLogin = async () => {
    const { password, username } = loginForm.getFieldsValue([
      "username",
      "password",
    ]);
    const res = (await mutateAsync({ username, password })) as any;
    if (res) {
      setOpen(false);
      message.success("登录成功");
      setIsLoggedIn(true);
      setUserInfo(res);
      const task = await taskList({ id: res?.id });
      if (task.find((item) => item.status == 1)) {
        message.warning("您有未完成的学习任务，请尽快完成任务");
      }
    } else {
      message.error("登录失败，请检查账号密码");
    }
  };
  return (
    <Form
      form={loginForm}
      labelAlign="left"
      labelCol={{ span: 4 }}
      className="w-full"
      onFinish={handleLogin}
    >
      <Form.Item
        name="username"
        label="账号"
        rules={[{ required: true, message: "请输入账号" }]}
        colon
      >
        <Input prefix={<UserOutlined />} placeholder="请使用账号登录" />
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
        <Input.Password
          type="password"
          prefix={<LockOutlined />}
          placeholder="请输入密码"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-between">
          <Button type="link" onClick={() => setTabKey("register")}>
            注册
          </Button>
        </div>
      </Form.Item>
      <Form.Item className="text-center" label="">
        <Button type="primary" htmlType="submit" className="w-full">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
