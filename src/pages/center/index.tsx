import {
  fetchAddTask,
  fetchDeletePost,
  getPersonalPosts,
  getStudyTaskList,
} from "@/apis/operator";
import { fetchUpdateUserInfo, getUserInfo } from "@/apis/user";
import { UserInfoContext } from "@/contexts/UserInfo";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Tabs,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EyeOutlined, MessageOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";

export default function Center() {
  const { state } = useLocation();
  const [tabKey, setTabKey] = useState("user");
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
  useEffect(() => {
    if (state?.tabKey) {
      setTabKey(state.tabKey);
    }
  }, [state?.tabKey]);

  return (
    <div
      className="w box-shadow box-border p-4"
      style={{ marginTop: "20px", minHeight: "500px", transition: "all 0.3s" }}
    >
      <Tabs
        items={tabItems}
        activeKey={tabKey}
        tabPosition="left"
        onChange={(key) => setTabKey(key)}
      />
    </div>
  );
}

function UserInfo() {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { data } = getUserInfo(userInfo?.id);
  const [form] = useForm();
  const [isEdit, setIsEdit] = useState(true);
  const { mutateAsync } = fetchUpdateUserInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo?.id) {
      message.error("请先登录！");
      navigate("/");
    }
  }, []);
  const submitHandle = async () => {
    const values = await form.validateFields();
    await mutateAsync({ id: userInfo?.id, ...values });
    setIsEdit(true);
    message.success("修改成功！");
    setUserInfo({ ...userInfo, ...values });
    form.setFieldsValue(values);
  };
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

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
          <Button type="primary" onClick={submitHandle}>
            提交
          </Button>
        )}
      </div>
    </>
  );
}

function Discuss() {
  const { userInfo } = useContext(UserInfoContext);
  const { data, refetch } = getPersonalPosts(userInfo?.id);
  const { mutateAsync } = fetchDeletePost();
  const navigate = useNavigate();
  return (
    <div>
      {data?.map((item: any) => (
        <div
          className="box-shadow box-border p-4 my-4"
          onClick={() =>
            navigate("/discussDetail", { state: { id: item?.id } })
          }
        >
          {item?.imageName && (
            <img src={item?.imageName} alt="" className="h-28" />
          )}
          <p
            style={{
              borderBottom: "1px solid #ccc",
              fontSize: "18px",
              fontWeight: "bold",
              paddingBottom: "6px",
            }}
          >
            {item?.postContent}
          </p>
          <Space className="text-right w-full justify-end">
            <span>
              <MessageOutlined />
              &nbsp;
              {item?.commentUserVoList?.length || 0}
            </span>
            <span>
              <EyeOutlined />
              &nbsp;
              {item?.views || 0}
            </span>
            <span>{item?.date || "2024-06-21 19:20:54"}</span>
          </Space>
          <Button
            type="text"
            style={{ color: "red" }}
            onClick={async (e) => {
              e.stopPropagation();
              await mutateAsync({ id: item?.id });
              message.success("删除成功！");
              refetch();
            }}
          >
            删除
          </Button>
        </div>
      ))}
      {data?.length === 0 && <div className="text-center">暂无数据</div>}
    </div>
  );
}

function Task() {
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("0");
  const { userInfo } = useContext(UserInfoContext);
  const { data, refetch } = getStudyTaskList(userInfo?.id);
  const { mutateAsync } = fetchAddTask();
  const list = useMemo(() => {
    if (status === "0") {
      return data;
    } else {
      return data?.filter((item: any) => item?.status == status);
    }
  }, [status, data]);
  return (
    <div className="sss">
      <Button type="primary" onClick={() => setVisible(true)}>
        增加学习计划
      </Button>
      <Tabs
        accessKey={status}
        onChange={(key) => setStatus(key)}
        items={[
          { key: "0", label: "所有学习计划" },
          { key: "1", label: "未完成学习计划" },
          { key: "2", label: "已完成学习计划" },
          { key: "3", label: "已过期学习计划" },
        ]}
      />
      {list?.map((item: any) => (
        <div
          className="flex flex-row justify-center h-32 w-full my-2 box-border"
          style={{ border: "1px solid #ccc" }}
        >
          <div
            style={{
              width: "200px",
              color: "white",
              fontSize: "24px",
              lineHeight: "128px",
              wordSpacing: "24px",
              textAlign: "center",
              background: `${
                item?.status === 1
                  ? "orange"
                  : item?.status === 2
                  ? "green"
                  : "red"
              }`,
            }}
          >
            {item?.status === 1
              ? "进行中"
              : item?.status === 2
              ? "已完成"
              : "已过期"}
          </div>
          <div className="flex-1 ml-6 box-border p-4 flex flex-col justify-center">
            <span
              style={{
                color: `${
                  item?.status === 1
                    ? "orange"
                    : item?.status === 2
                    ? "green"
                    : "red"
                }`,
              }}
            >
              学习类型：{item?.type}
            </span>
            <span>计划开始日期：{item?.startDate}</span>
            <span>计划结束日期：{item?.endDate}</span>
            <span>计划总量：{item?.goal || 0}</span>
            {item.status !== 2 && <span>完成数量：{item?.finishing || 0}</span>}
          </div>
        </div>
      ))}
      {list?.length === 0 && <div className="text-center">暂无数据</div>}
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title="增加学习计划"
      >
        <Form
          form={form}
          initialValues={{
            type: "方剂",
            goal: 10,
          }}
          onFinish={async (e: any) => {
            if (data?.filter((item: any) => item.status == 1).length > 0) {
              message.error("请先完成当前进行中的学习计划！");
              return;
            }

            await mutateAsync({
              ...e,
              startDate: dayjs(e.startDate).format("YYYY-MM-DD"),
              endDate: dayjs(e.endDate).format("YYYY-MM-DD"),
              userId: userInfo?.id,
            });
            await refetch();
            setVisible(false);
            message.success("增加学习计划成功！");
          }}
        >
          <Form.Item
            label="计划类型"
            name={"type"}
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={"方剂"}>方剂</Radio>
              <Radio value={"病症"}>病症</Radio>
              <Radio value={"中药"}>中药</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="计划开始日期"
            name={"startDate"}
            rules={[{ required: true, message: "请输入计划开始日期！" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="计划结束日期"
            name={"endDate"}
            rules={[{ required: true, message: "请输入计划结束日期！" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="计划总量"
            name={"goal"}
            rules={[{ required: true, message: "请输入计划学习数量！" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
