import { Outlet } from "react-router-dom";

export default function Index() {
  return (
    <>
      <div>公共部分</div>
      <Outlet></Outlet>
    </>
  );
}
