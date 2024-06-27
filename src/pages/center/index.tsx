import { getUserInfo } from "@/apis/user";
import { UserInfoContext } from "@/contexts/UserInfo";
import { Button, Form, Input, Radio, Switch, Tabs, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Center() {
  const [tabKey] = useState("user");
  const tabItems = [
    {
      key: "user",
      label: "个人信息",
      children: <UserInfo />,
    },
    {
      key: "discuss",
      label: "帖子管理",
      children: <Discuss />,
    },
    {
      key: "task",
      label: "学习计划",
      children: <Task />,
    },
  ];

  return (
    <div
      className="w box-shadow box-border p-4"
      style={{ marginTop: "20px", height: "500px" }}
    >
      <Tabs items={tabItems} key={tabKey} tabPosition="left" />
    </div>
  );
}

function UserInfo() {
  const { userInfo } = useContext(UserInfoContext);
  const { data } = getUserInfo(userInfo?.id);
  const [form] = useForm();
  const [isEdit, setIsEdit] = useState(true);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!userInfo?.id) {
  //     message.error("请先登录！");
  //     navigate("/");
  //   }
  // }, []);
  console.log(data);

  return (
    <>
      <h2>个人信息</h2>
      <div className="flex flex-row justify-center">
        <Form
          form={form}
          initialValues={data}
          style={{ width: "50%" }}
          labelCol={{ span: 6 }}
          disabled={isEdit}
        >
          <Form.Item
            name={"name"}
            label="账号"
            rules={[{ required: true, message: "请输入账号！" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"username"}
            label="昵称"
            rules={[{ required: true, message: "请输入昵称！" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"phone"}
            label="手机号"
            rules={[
              { required: true, message: "请输入手机号！" },
              { max: 11, message: "请输入正确的手机号！" },
              { min: 11, message: "请输入正确的手机号！" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="密码"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item name={"gender"} label="性别" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={"1"}>男</Radio>
              <Radio value={"0"}>女</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
      <div className="flex flex-row justify-center">
        {isEdit ? (
          <Button type="primary" onClick={() => setIsEdit(false)}>
            编辑
          </Button>
        ) : (
          <Button type="primary">提交</Button>
        )}
      </div>
    </>
  );
}

function Discuss() {
  return <div>Discuss</div>;
}

function Task() {
  return <div>Task</div>;
}
