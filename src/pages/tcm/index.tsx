import { getTCMList } from "@/apis/list";
import { useNavigate } from "react-router-dom";

export default function TCM() {
  const { data: tcmList } = getTCMList();
  const navigate = useNavigate();
  return (
    <div className="w box-shadow" style={{ marginTop: "20px" }}>
      {tcmList?.map((item: any) => (
        <div
          className="flex flex-row box-border p-4 tcm-item"
          style={{ borderBottom: "2px solid #e6e6e6" }}
          onClick={() => navigate(`/tcmDetail`, { state: { id: item.id } })}
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
              中药名：<span style={{ color: "red" }}>{item?.name}</span>
            </p>
            <p>类型：{item?.type}</p>
            <p>用法：{item?.function}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
