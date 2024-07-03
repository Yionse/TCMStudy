import {
  getFamousDoctorList,
  getPrescriptionList,
  getSymptomList,
  getTCMList,
} from "@/apis/list";
import "./index.less";
import { fetchDownloadFile } from "@/apis/operator";
import { useContext } from "react";
import { UserInfoContext } from "@/contexts/UserInfo";
import { message } from "antd";

export default function Resource() {
  const { data: tcmList } = getTCMList();
  const { data: famousDoctorList } = getFamousDoctorList();
  const { data: prescriptionList } = getPrescriptionList();
  const { data: symptomList } = getSymptomList();
  const { mutateAsync } = fetchDownloadFile();
  const { userInfo } = useContext(UserInfoContext);
  const handleDownload = async (item: any, type: number) => {
    await mutateAsync({
      userId: userInfo?.id,
      studyId: item.id,
      type,
      filePath: `D:\\${item.name}.docx`,
    });
    message.success("下载成功！");
    message.success("请前往D盘根目录查看！");
  };
  return (
    <div
      className="box-shadow w p-4 box-border flex flex-col source-container"
      style={{ marginTop: "20px" }}
    >
      <h3>中药</h3>
      {tcmList?.map((item: any) => (
        <span className="resource" onClick={() => handleDownload(item, 1)}>
          中药：{item?.name}
        </span>
      ))}
      <h3>名方</h3>

      {prescriptionList?.map((item: any) => (
        <span className="resource" onClick={() => handleDownload(item, 3)}>
          名方：{item?.name}
        </span>
      ))}
      <h3>症状</h3>

      {symptomList?.map((item: any) => (
        <span className="resource" onClick={() => handleDownload(item, 4)}>
          症状：{item?.name}
        </span>
      ))}
      <h3>名中医</h3>

      {famousDoctorList?.map((item: any) => (
        <span className="resource" onClick={() => handleDownload(item, 2)}>
          名中医：{item?.name}
        </span>
      ))}
    </div>
  );
}
