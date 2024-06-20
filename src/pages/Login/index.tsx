import Header from "@/components/Header";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div>选项</div>
      <Button onClick={() => navigate("todo")}>todolist</Button>
      <Button onClick={() => navigate("count")}>count</Button>
    </>
  );
}
