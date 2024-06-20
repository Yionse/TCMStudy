import { useAppDispatch, useAppSelector } from "@/stores";
import { increment, decrement } from "@/stores/count";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Count() {
  const count = useAppSelector((state) => state.count.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div>Count Page</div>
      <div>{count}</div>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Increment</Button>
      <Button onClick={() => navigate("/todo")}>go todo</Button>
    </>
  );
}
