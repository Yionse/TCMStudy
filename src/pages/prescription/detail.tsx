import { getPrescriptionDetail } from "@/apis/list";
import { useLocation } from "react-router-dom";

export default function PrescriptionPageDetail() {
  const { state } = useLocation();
  const { data: item } = getPrescriptionDetail(state?.id || 1);
  return (
    <div className="w box-shadow" style={{ marginTop: "20px" }}>
      <div
        className={`box-border p-4 prescription-item`}
        style={{ borderBottom: "2px solid #e6e6e6" }}
      >
        <div className="flex flex-row justify-center">
          <img
            src={item?.imageName}
            style={{
              width: "500px",
              height: "300px",
            }}
            className="rounded-xl w-1/2"
          />
        </div>
        <div className="box-border px-4">
          <p>
            方剂名称：<span style={{ color: "red" }}>{item?.name}</span>
          </p>
          <p>用法：{item?.usage}</p>
          <p>配方：{item?.composition}</p>
          <p>
            主治：
            <span style={{ fontWeight: "bold", whiteSpace: "pre-wrap" }}>
              {"\n\t" + item?.function}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
