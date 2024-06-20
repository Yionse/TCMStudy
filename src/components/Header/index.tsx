import logo from "@/assets/logo.png";
import { Button, Input } from "antd";
import Search from "antd/es/input/Search";
import { SearchOutlined } from "@ant-design/icons";
import { useLogin } from "@/hooks/useLogin";
import { useContext } from "react";
import { TabContext } from "@/contexts/TabContextProvide";

export default function Header() {
  const onSearch = (value: string) => {};
  const { tabKey, setTabKey, open, setOpen } = useContext(TabContext);
  const { NodeModel } = useLogin({ tabKey, setTabKey, open, setOpen });
  return (
    <div
      className="w-4/5 mx-auto flex justify-between items-center py-1 px-4"
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
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
      <Button type="primary" onClick={() => setOpen(true)}>
        登录
      </Button>
      {NodeModel}
    </div>
  );
}
