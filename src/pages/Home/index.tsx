import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div>选项</div>
      <Button onClick={() => navigate("todo")}>todolist</Button>
      <Button onClick={() => navigate("count")}>count</Button>
    </>
  );
}
