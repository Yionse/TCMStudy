import Header from "@/components/Header";
import "./index.less";
import { Outlet } from "react-router-dom";

export default function Index() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
