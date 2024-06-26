import { getList } from "@/apis/list";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DiscussPage() {
  const { data: postsList } = getList();
  const navigate = useNavigate() as any;
  return (
    <div className="w" style={{ marginTop: "20px" }}>
      {postsList?.map((item: any) => (
        <div className="box-shadow box-border p-4 my-4">{item.postContent}</div>
      ))}
    </div>
  );
}
