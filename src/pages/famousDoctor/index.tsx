import { getFamousDoctorList } from "@/apis/list";

export default function FamousDoctor() {
  const { data: famousDoctorList } = getFamousDoctorList();
  return (
    <div className="w box-shadow" style={{ marginTop: "20px" }}>
      {famousDoctorList?.map((item: any, index: number) => (
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
