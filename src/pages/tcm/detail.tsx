import { getTcmDetail } from "@/apis/list";
import { fetchAddStudyCount } from "@/apis/operator";
import { UserInfoContext } from "@/contexts/UserInfo";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TcmDetail() {
  const { state } = useLocation() as any;
  const { data: item } = getTcmDetail(state.id || 1);
  const { mutateAsync } = fetchAddStudyCount();
  const { userInfo } = useContext(UserInfoContext);
  useEffect(() => {
    if (!userInfo?.id) {
      return;
    }
    mutateAsync({
      type: "中药",
      userId: userInfo?.id,
      studyId: state?.id,
    });
  }, []);
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
            中药名：<span style={{ color: "#96ca59" }}>{item?.name}</span>
          </p>
          <p>类型：{item?.type}</p>
          <p>用法：{item?.function}</p>
        </div>
      </div>
    </div>
  );
}
