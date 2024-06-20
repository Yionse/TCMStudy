import { useAppSelector } from "@/stores";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const state = useAppSelector((state) => state.count.value);
  const navigate = useNavigate();
  console.log(state);
  return (
    <>
      <div>Todo-{state}</div>
      <Button onClick={() => navigate("/count")}>go counter</Button>
    </>
  );
}
