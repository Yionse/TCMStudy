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

export default function Index() {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "240px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const { data: tcmList } = getTCMList();
  const { data: famousDoctorList } = getFamousDoctorList();
  const { data: prescriptionList } = getPrescriptionList();
  const { data: symptomList } = getSymptomList();
  return (
    <>
      <Header />
      <div
        className="w overflow-hidden flex flex-row"
        style={{ margin: "30px auto" }}
      >
        <div className="w-2/3">
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
        <div
          className="ml-6 box-border flex-1"
          style={{ border: "2px solid #e6e6e6" }}
        >
          <h3
            style={{ borderBottom: "1px solid #e6e6e6", lineHeight: "40px" }}
            className="m-0 h-10 pl-2"
          >
            最新热贴
          </h3>
          <div>
            <ul className="p-2 m-0 discuss-type">
              <li>
                1、中药是啥？
                <span>999</span>
              </li>
              <li>
                2<span>999</span>
              </li>
              <li>
                3<span>999</span>
              </li>
              <li>
                4<span>999</span>
              </li>
              <li>
                5<span>999</span>
              </li>
              <li>
                6<span>999</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w box-border my-2 box-shadow flex flex-row">
        <ul className="flex flex-row justify-between w-full item-type">
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
      <div
        className="w flex flex-row  justify-between"
        style={{ margin: "30px auto" }}
      >
        <div style={{ width: "48%" }} className="box-shadow">
          <h2 className="pl-4 " style={{ borderBottom: "1px solid #e6e6e6" }}>
            中医药列表
          </h2>
          {[1, 2, 3, 4].map((item) => (
            <div className="flex flex-row box-border p-4 tcm-item">
              <img
                src="https://ts1.cn.mm.bing.net/th/id/R-C.ba2b1aad151d744478f6a021d6326d0c?rik=MEg3ehVSoBdgTQ&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50122%2f4011.jpg_wh1200.jpg&ehk=omKGSrZQ09TroqSqrq8KBAwTT1tmVmqcn5L2btvh80g%3d&risl=&pid=ImgRaw&r=0"
                className="rounded-xl"
                style={{
                  width: "300px",
                  height: "200px",
                }}
              />
              <div className="box-border pl-8">
                <p>中药名：桑葚</p>
                <p>类型：不知道</p>
                <p>用法：谢谢小星星</p>
              </div>
            </div>
          ))}
        </div>
        <div className="box-shadow" style={{ width: "48%" }}>
          <h2 className="pl-4 " style={{ borderBottom: "1px solid #e6e6e6" }}>
            方剂列表
          </h2>
          {[1, 2, 3, 4].map((item) => (
            <div
              className="flex flex-row box-border p-4 prescription-item"
              style={{ borderBottom: "2px solid #e6e6e6" }}
            >
              <img
                src="https://ts1.cn.mm.bing.net/th/id/R-C.ba2b1aad151d744478f6a021d6326d0c?rik=MEg3ehVSoBdgTQ&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50122%2f4011.jpg_wh1200.jpg&ehk=omKGSrZQ09TroqSqrq8KBAwTT1tmVmqcn5L2btvh80g%3d&risl=&pid=ImgRaw&r=0"
                style={{
                  width: "400px",
                  height: "200px",
                }}
              />
              <div className="box-border pl-8">
                <p>中药名：桑葚</p>
                <p>类型：不知道</p>
                <p>用法：谢谢小星星</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
