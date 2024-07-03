import { getSymptomList } from "@/apis/list";
import { useNavigate } from "react-router-dom";

export default function SymptomPage() {
  const { data: symptomList } = getSymptomList();
  const navigation = useNavigate();
  return (
    <div className="w box-shadow" style={{ marginTop: "20px" }}>
      {symptomList?.map((item: any) => (
        <div
          className="flex flex-row box-border p-4 prescription-item"
          style={{ borderBottom: "2px solid #e6e6e6" }}
          onClick={() =>
            navigation("/symptomDetail", { state: { id: item?.id } })
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
            <p>
              病症名称：<span style={{ color: "#96ca59" }}>{item?.name}</span>
            </p>
            <p>病因：{item?.etiology.slice(0, 60) + "..."}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
