import { getSymptomDetail } from "@/apis/list";
import { fetchAddStudyCount } from "@/apis/operator";
import { UserInfoContext } from "@/contexts/UserInfo";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SymptomPageDetail() {
  const { state } = useLocation();
  const { data: item } = getSymptomDetail(state.id);
  const { mutateAsync } = fetchAddStudyCount();
  const { userInfo } = useContext(UserInfoContext);
  useEffect(() => {
    if (!userInfo?.id) {
      return;
    }
    mutateAsync({
      type: "病症",
      userId: userInfo?.id,
    });
  }, []);
  return (
    <div
      className="box-border p-4 prescription-item w box-shadow"
      style={{ borderBottom: "2px solid #e6e6e6", marginTop: "20px" }}
    >
      <div className="flex flex-row justify-center">
        <img
          src={item?.imageName}
          style={{
            width: "400px",
            height: "200px",
          }}
          className="rounded-xl"
        />
      </div>
      <div className="box-border pl-8">
        <p>
          病症名称：<span style={{ color: "#96ca59" }}>{item?.name}</span>
        </p>
        <p>
          描述：<span className="importance">{"\n\t" + item?.description}</span>
        </p>
        <p>
          病因：<span className="importance">{"\n\t" + item?.etiology}</span>
        </p>
      </div>
    </div>
  );
}
