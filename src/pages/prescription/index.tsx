import { getPrescriptionList } from "@/apis/list";
import { useNavigate } from "react-router-dom";

export default function PrescriptionPage() {
  const { data: prescriptionList } = getPrescriptionList();
  const navigate = useNavigate();
  return (
    <div className="w box-shadow" style={{ marginTop: "20px" }}>
      {prescriptionList?.map((item: any, index: number) => (
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
    </div>
  );
}
