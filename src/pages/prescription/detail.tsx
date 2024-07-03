import { getPrescriptionDetail } from "@/apis/list";
import { fetchAddStudyCount } from "@/apis/operator";
import { UserInfoContext } from "@/contexts/UserInfo";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PrescriptionPageDetail() {
  const { state } = useLocation();
  const { data: item } = getPrescriptionDetail(state?.id || 1);
  const { mutateAsync } = fetchAddStudyCount();
  const { userInfo } = useContext(UserInfoContext);
  useEffect(() => {
    if (!userInfo?.id) {
      return;
    }
    mutateAsync({
      type: "方剂",
      userId: userInfo?.id,
    });
  }, []);
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
            方剂名称：<span style={{ color: "#96ca59" }}>{item?.name}</span>
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
