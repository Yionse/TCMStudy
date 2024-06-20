import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext } from "react";
import { TabContext } from "@/contexts/TabContextProvide";
import moment from "moment";
import store from "@/stores";

export default function Login() {
  const [loginForm] = useForm();
  const { setTabKey, setOpen } = useContext(TabContext);
  // const { mutateAsync: login, isLoading } = useFetchLogin();
  // const { mutateAsync: getSalt } = fetchSalt();
  const handleLogin = async () => {
    const { password, username } = loginForm.getFieldsValue([
      "username",
      "password",
    ]);
    // 加第二次盐，从数据库获取
    // const { salt } = await getSalt({ qq: username, isCreate: false });
    // const pass = await passEncipherTwo(password, username, salt);
    // const res = await login({ qq: username, pass });
    // if (res.isLogin) {
    //   // 登录成功
    //   setToken(() => res.token);
    //   setOpen(false);
    //   setUserInfo({
    //     ...res.userInfo,
    //     registerDays: moment().diff(Number(res.userInfo.registerDate), "days"),
    //   });
    //   localStorage.setItem("BLOG_TOKEN", res.token);
    //   const resUnreadCount = await mutateAsync({ qq: username });
    //   store.message.unreadAllCount = resUnreadCount.unreadCount;
    //   setIsLogin(true);
    // }
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
        rules={[
          { required: true, message: "请输入账号" },
          { max: 12, message: "请输入合法的账号" },
          { min: 6, message: "请输入合法的账号" },
        ]}
        colon
      >
        <Input
          type="number"
          prefix={<UserOutlined />}
          placeholder="请使用账号登录"
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
