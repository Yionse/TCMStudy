import {
  fetchSearchDoctor,
  fetchSearchPost,
  fetchSearchPrescription,
  fetchSearchSymptom,
  fetchSearchTcm,
} from "@/apis/operator";
import { Space } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EyeOutlined, MessageOutlined } from "@ant-design/icons";

export default function SearchPage() {
  const { mutateAsync: post } = fetchSearchPost();
  const { mutateAsync: tcm } = fetchSearchTcm();
  const { mutateAsync: symptom } = fetchSearchSymptom();
  const { mutateAsync: doctor } = fetchSearchDoctor();
  const { mutateAsync: prescription } = fetchSearchPrescription();
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    async function fetchSearch() {
      const res = await Promise.all([
        post(state.keyword),
        tcm(state.keyword),
        symptom(state.keyword),
        doctor(state.keyword),
        prescription(state.keyword),
      ]);
      console.log(res?.[0]?.length);

      setData(res as any);
    }
    fetchSearch();
  }, [state.keyword]);
  return (
    <div className="box-shadow w box-border p-4" style={{ marginTop: "20px" }}>
      <h1>
        根据您的关键字：
        <span style={{ color: "#96ca59", fontWeight: "bold" }}>
          {state?.keyword}
        </span>{" "}
        搜索结果如下：
      </h1>
      {data?.[0]?.length > 0 && (
        <h2 className="my-2 pb-1" style={{ borderBottom: "4px solid #eee" }}>
          帖子
        </h2>
      )}
      {data?.[0]?.map((item) => (
        <div
          className="box-shadow w box-border p-8"
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/discussDetail", { state: { id: item.id } })}
        >
          {item?.imageName && <img className="h-28" src={item.imageName} />}
          <p>{item?.postContent}</p>
          <Space className="text-right w-full justify-end">
            <span>
              <MessageOutlined />
              &nbsp;
              {item?.commentUserVoList?.length || 0}
            </span>
            <span>
              <EyeOutlined />
              &nbsp;
              {item?.views || 0}
            </span>
            <span>{item?.date || "2024-06-21 19:20:54"}</span>
          </Space>
        </div>
      ))}
      {data?.[1]?.length > 0 && (
        <h2 className="my-2 pb-1" style={{ borderBottom: "4px solid #eee" }}>
          中药
        </h2>
      )}
      {data?.[1]?.map((item) => (
        <div
          className="w  box-border p-4 tcm-item box-shadow"
          style={{ borderBottom: "2px solid #e6e6e6", marginTop: "20px" }}
          onClick={() => navigate(`/tcmDetail`, { state: { id: item.id } })}
        >
          <div className="flex flex-row justify-center">
            <img
              src={item?.imageName}
              className="rounded-xl"
              style={{
                width: "500px",
                height: "300px",
              }}
            />
          </div>
          <div className="box-border pl-8 ">
            <p>
              中药名：<span style={{ color: "#96ca59" }}>{item?.name}</span>
            </p>
            <p>类型：{item?.type}</p>
            <p>用法：{item?.function}</p>
          </div>
        </div>
      ))}
      {data?.[2]?.length > 0 && (
        <h2 className="my-2 pb-1" style={{ borderBottom: "4px solid #eee" }}>
          病症
        </h2>
      )}
      {data?.[2]?.map((item: any) => (
        <div
          className="flex flex-row box-border p-4 prescription-item"
          style={{ borderBottom: "2px solid #e6e6e6" }}
          onClick={() =>
            navigate("/symptomDetail", { state: { id: item?.id } })
          }
        >
          <img
            src={item?.imageName}
            style={{
              // width: "400px",
              height: "200px",
            }}
            className="rounded-xl w-1/3"
          />
          <div className="box-border pl-8 w-2/3">
            <p>病症名称：{item?.name}</p>
            <p>病因：{item?.etiology.slice(0, 60) + "..."}</p>
          </div>
        </div>
      ))}
      {data?.[4]?.length > 0 && (
        <h2 className="my-2 pb-1" style={{ borderBottom: "4px solid #eee" }}>
          方剂
        </h2>
      )}
      {data?.[4]?.map((item: any, index: number) => (
        <div
          className={`flex flex-row box-border p-4 prescription-item ${
            index % 2 === 0 ? "flex-row-reverse" : ""
          }`}
          style={{ borderBottom: "2px solid #e6e6e6" }}
          onClick={() =>
            navigate("/prescriptionDetail", { state: { id: item.id } })
          }
        >
          <img
            src={item?.imageName}
            style={{
              // width: "400px",
              height: "300px",
            }}
            className="rounded-xl w-1/2"
          />
          <div className="box-border px-4 w-1/2">
            <p>
              方剂名称：<span style={{ color: "#96ca59" }}>{item?.name}</span>
            </p>
            <p>用法：{item?.usage}</p>
            <p>配方：{item?.composition}</p>
          </div>
        </div>
      ))}
      {data?.[3]?.length > 0 && (
        <h2 className="my-2 pb-1" style={{ borderBottom: "4px solid #eee" }}>
          中医
        </h2>
      )}
      {data?.[3]?.map((item: any, index: number) => (
        <div
          className={`flex flex-row box-border p-4 prescription-item ${
            index % 2 === 0 ? "flex-row-reverse" : ""
          }`}
          style={{ borderBottom: "2px solid #e6e6e6" }}
        >
          <img
            src={item?.imageName}
            style={{
              // width: "400px",
              height: "300px",
            }}
            className="rounded-xl w-1/3"
          />
          <div className="box-border px-4 w-2/3">
            <p>
              医生姓名：<span style={{ color: "#96ca59" }}>{item?.name}</span>
            </p>
            <p>主要治疗方向：{item?.specialty}</p>
            <p>简介：{item?.briefIntro}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
