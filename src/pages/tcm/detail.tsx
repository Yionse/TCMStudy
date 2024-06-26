import { getTcmDetail } from "@/apis/list";
import { useLocation } from "react-router-dom";

export default function TcmDetail() {
  const { state } = useLocation() as any;
  const { data: item } = getTcmDetail(state.id || 1);
  return (
    <div>
      <div
        className="w  box-border p-4 tcm-item box-shadow"
        style={{ borderBottom: "2px solid #e6e6e6", marginTop: "20px" }}
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
            中药名：<span style={{ color: "red" }}>{item?.name}</span>
          </p>
          <p>类型：{item?.type}</p>
          <p>用法：{item?.function}</p>
        </div>
      </div>
    </div>
  );
}
