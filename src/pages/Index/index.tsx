import {
  BarChartOutlined,
  AppstoreOutlined,
  FunnelPlotOutlined,
  SkinOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import Header from "@/components/Header";
import "./index.less";
import { Carousel } from "antd";
import {
  getFamousDoctorList,
  getPrescriptionList,
  getSymptomList,
  getTCMList,
} from "@/apis/list";
import { Outlet, useNavigate } from "react-router-dom";

export default function Index() {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "240px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const navigation = useNavigate() as any;
  const { data: tcmList } = getTCMList();
  const { data: famousDoctorList } = getFamousDoctorList();
  const { data: prescriptionList } = getPrescriptionList();
  const { data: symptomList } = getSymptomList();
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
