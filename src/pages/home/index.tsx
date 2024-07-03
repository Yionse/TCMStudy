import {
  BarChartOutlined,
  AppstoreOutlined,
  FunnelPlotOutlined,
  SkinOutlined,
  SolutionOutlined,
  EyeOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { Carousel, message } from "antd";
import {
  getFamousDoctorList,
  getList,
  getPrescriptionList,
  getSymptomList,
  getTCMList,
} from "@/apis/list";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserInfoContext } from "@/contexts/UserInfo";

export default function Home() {
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
  const { data: postsList } = getList();
  const { isLoggedIn } = useContext(UserInfoContext);
  return (
    <>
      <div
        className="w overflow-hidden flex flex-row"
        style={{ margin: "30px auto" }}
      >
        <div className="w-2/3">
          <Carousel autoplay>
            <div>
              <div
                style={contentStyle}
                className="flex flex-row relative"
                onClick={() => navigation("/tcm")}
              >
                {tcmList?.slice(0, 4).map((item: any) => (
                  <img src={item?.imageName} className="w-1/4" />
                ))}
                <h3
                  className="absolute bottom-0 left-0 w-full text-left"
                  style={{
                    boxSizing: "border-box",
                    height: "40px",
                    lineHeight: "40px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    margin: 0,
                    paddingLeft: "20px",
                  }}
                >
                  查看更多中药材--&gt;
                </h3>
              </div>
            </div>
            <div>
              <div
                style={contentStyle}
                className="flex flex-row relative"
                onClick={() => navigation("/doctor")}
              >
                {famousDoctorList?.slice(0, 4).map((item: any) => (
                  <img src={item?.imageName} className="w-1/4" />
                ))}
                <h3
                  className="absolute bottom-0 left-0 w-full text-left"
                  style={{
                    boxSizing: "border-box",
                    height: "40px",
                    lineHeight: "40px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    margin: 0,
                    paddingLeft: "20px",
                  }}
                >
                  查看更多名中医--&gt;
                </h3>
              </div>
            </div>
            <div>
              <div
                style={contentStyle}
                className="flex flex-row relative"
                onClick={() => navigation("/prescription")}
              >
                {prescriptionList?.slice(0, 4).map((item: any) => (
                  <img src={item?.imageName} className="w-1/4" />
                ))}
                <h3
                  className="absolute bottom-0 left-0 w-full text-left"
                  style={{
                    boxSizing: "border-box",
                    height: "40px",
                    lineHeight: "40px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    margin: 0,
                    paddingLeft: "20px",
                  }}
                >
                  查看更多名方--&gt;
                </h3>
              </div>
            </div>
            <div>
              <div
                style={contentStyle}
                className="flex flex-row relative"
                onClick={() => navigation("/symptom")}
              >
                {symptomList?.slice(0, 4).map((item: any) => (
                  <img src={item?.imageName} className="w-1/4" />
                ))}
                <h3
                  className="absolute bottom-0 left-0 w-full text-left"
                  style={{
                    boxSizing: "border-box",
                    height: "40px",
                    lineHeight: "40px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    margin: 0,
                    paddingLeft: "20px",
                  }}
                >
                  查看更多病症--&gt;
                </h3>
              </div>
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
              {postsList?.slice(0, 5).map((item: any, index: number) => (
                <li
                  onClick={() =>
                    navigation("/discussDetail", { state: { id: item?.id } })
                  }
                >
                  {`${index + 1}、${item.postContent.slice(0, 20)}`}
                  <span>
                    <EyeOutlined />
                    &nbsp;&nbsp;
                    {item.views}
                  </span>
                </li>
              ))}
              <li onClick={() => navigation("/discuss")}>查看更多</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w box-border my-2 box-shadow flex flex-row">
        <ul className="flex flex-row justify-between w-full item-type">
          <li onClick={() => navigation("/tcm")}>
            <BarChartOutlined />
            <span>中药</span>
          </li>
          <li onClick={() => navigation("/prescription")}>
            <AppstoreOutlined />
            <span>方剂</span>
          </li>
          <li onClick={() => navigation("/symptom")}>
            <FunnelPlotOutlined />
            <span>病症</span>
          </li>
          <li onClick={() => navigation("/doctor")}>
            <SkinOutlined />
            <span>名中医</span>
          </li>
          <li onClick={() => navigation("/discuss")}>
            <SolutionOutlined />
            <span>讨论区</span>
          </li>
          <li
            onClick={() => {
              if (isLoggedIn) {
              } else {
                message.error("请先登录");
              }
            }}
          >
            <CloudDownloadOutlined />
            <span>下载专区</span>
          </li>
        </ul>
      </div>
      <div
        className="w flex flex-row  justify-between"
        style={{ margin: "30px auto" }}
      >
        <div style={{ width: "48%" }} className="box-shadow">
          <h2
            className="pl-4 relative"
            style={{ borderBottom: "1px solid #e6e6e6", color: "#96ca59" }}
          >
            中医药列表
            <span
              className="absolute right-2 top-0 text-base "
              style={{ color: "rgba(22, 119, 255, .6)" }}
              onClick={() => navigation("/tcm")}
            >
              查看更多
            </span>
          </h2>
          {tcmList?.slice(0, 10).map((item: any) => (
            <div
              className="flex flex-row box-border p-4 tcm-item"
              style={{ borderBottom: "2px solid #e6e6e6" }}
              onClick={() =>
                navigation("tcmDetail", { state: { id: item?.id } })
              }
            >
              <img
                src={item?.imageName}
                className="rounded-xl w-1/3"
                style={{
                  // width: "300px",
                  height: "200px",
                }}
              />
              <div className="box-border pl-8 w-2/3">
                <p>
                  中药名：<span style={{ color: "#96ca59" }}>{item?.name}</span>
                </p>
                <p>类型：{item?.type}</p>
                <p>用法：{item?.function}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="box-shadow" style={{ width: "48%" }}>
          <h2
            className="pl-4 relative"
            style={{ borderBottom: "1px solid #e6e6e6", color: "#96ca59" }}
          >
            方剂列表
            <span
              className="absolute right-2 top-0 text-base "
              style={{ color: "rgba(22, 119, 255, .6)" }}
              onClick={() => navigation("/prescription")}
            >
              查看更多
            </span>
          </h2>
          {prescriptionList?.slice(0, 5).map((item: any, index: number) => (
            <div
              className={`flex flex-row box-border p-4 prescription-item ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
              style={{ borderBottom: "2px solid #e6e6e6" }}
              onClick={() =>
                navigation("prescriptionDetail", { state: { id: item?.id } })
              }
            >
              <img
                src={item?.imageName}
                style={{
                  // width: "400px",
                  height: "200px",
                }}
                className="rounded-xl w-1/2"
              />
              <div className="box-border px-4 w-1/2">
                <p>
                  方剂名称：
                  <span style={{ color: "#96ca59" }}>{item?.name}</span>
                </p>
                <p>用法：{item?.usage}</p>
              </div>
            </div>
          ))}
          <h2
            className="pl-4 relative"
            style={{ borderBottom: "1px solid #e6e6e6", color: "#96ca59" }}
          >
            病症列表
            <span
              className="absolute right-2 top-0 text-base "
              style={{ color: "rgba(22, 119, 255, .6)" }}
              onClick={() => navigation("/symptom")}
            >
              查看更多
            </span>
          </h2>
          {symptomList?.slice(0, 5).map((item: any) => (
            <div
              className="flex flex-row box-border p-4 prescription-item"
              style={{ borderBottom: "2px solid #e6e6e6" }}
              onClick={() =>
                navigation("symptomDetail", { state: { id: item?.id } })
              }
            >
              <img
                src={item?.imageName}
                style={{
                  // width: "400px",
                  height: "200px",
                }}
                className="rounded-xl w-1/2"
              />
              <div className="box-border pl-8 w-1/2">
                <p>
                  病症名称：
                  <span style={{ color: "#96ca59" }}>{item?.name}</span>
                </p>
                <p>病因：{item?.etiology.slice(0, 60) + "..."}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
