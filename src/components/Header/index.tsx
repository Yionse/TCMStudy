import logo from "@/assets/logo.png";
import { Button, Input, Space, message } from "antd";
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";
import { useLogin } from "@/hooks/useLogin";
import { useContext } from "react";
import { TabContext } from "@/contexts/TabContextProvide";
import { UserInfoContext } from "@/contexts/UserInfo";

export default function Header() {
  const onSearch = (value: string) => {};
  const { tabKey, setTabKey, open, setOpen } = useContext(TabContext);
  const { NodeModel } = useLogin({ tabKey, setTabKey, open, setOpen });
  const { isLoggedIn, userInfo } = useContext(UserInfoContext);
  return (
    <div className="w-4/5 mx-auto flex justify-between items-center py-1 px-4 box-border box-shadow">
      <img src={logo} className="w-20 h-20 rounded-full" />
      <Search
        className="w-2/5"
        placeholder="请输入中药名、药方、中医名"
        enterButton="搜索"
        size="large"
        suffix={
          <SearchOutlined
            style={{
              fontSize: 16,
              color: "#1677ff",
            }}
          />
        }
        onSearch={onSearch}
      />
      <Space className="ml-auto">
        <div className="">
          <Button
            type="link"
            onClick={() => {
              if (!isLoggedIn) {
                message.error("请先登录！");
              } else {
              }
            }}
          >
            资源下载
          </Button>
          <Button
            type="link"
            onClick={() => {
              if (!isLoggedIn) {
                message.error("请先登录！");
              } else {
              }
            }}
          >
            学习计划
          </Button>
        </div>
        {isLoggedIn ? (
          `Hi, ${userInfo.name}`
        ) : (
          <Button type="primary" onClick={() => setOpen(true)}>
            登录
          </Button>
        )}
        {isLoggedIn && <Button type="link">个人中心</Button>}
      </Space>
      {NodeModel}
    </div>
  );
}
