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

export default function Index() {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "240px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const onChange = (current: number) => {
    console.log(current);
  };
  return (
    <>
      <Header />
      <div className="w overflow-hidden" style={{ margin: "30px auto" }}>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
      <div className="w box-border my-2 box-shadow flex flex-row">
        <ul className="flex flex-row justify-between w-full">
          <li>
            <BarChartOutlined />
            <span>中药</span>
          </li>
          <li>
            <AppstoreOutlined />
            <span>方剂</span>
          </li>
          <li>
            <FunnelPlotOutlined />
            <span>病症</span>
          </li>
          <li>
            <SkinOutlined />
            <span>名中医</span>
          </li>
          <li>
            <SolutionOutlined />
            <span>讨论区</span>
          </li>
        </ul>
      </div>
    </>
  );
}
