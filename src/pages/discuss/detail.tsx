import { getPostDetail } from "@/apis/list";
import { Button, Input, Space, message } from "antd";
import { useLocation } from "react-router-dom";
import { MessageOutlined, EyeOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { fetchAddComment } from "@/apis/operator";
import { UserInfoContext } from "@/contexts/UserInfo";

export default function DiscussDetail() {
  const { state } = useLocation();
  const { data, refetch } = getPostDetail(state.id);
  const [text, setText] = useState("");
  const { mutateAsync } = fetchAddComment();
  const { userInfo } = useContext(UserInfoContext);
  const addComment = async () => {
    if (!userInfo?.id) {
      message.error("请先登录");
      return;
    }
    if (text.trim() === "") {
      message.error("评论内容不能为空");
    } else {
      await mutateAsync({
        postId: state.id,
        commentContent: text,
        userId: userInfo.id,
      });
      await refetch();
      setText("");
      message.success("评论成功");
    }
  };
  return (
    <>
      <div
        className="box-shadow w box-border p-8"
        style={{ marginTop: "20px" }}
      >
        {data?.imageName && <img className="h-28" src={data.imageName} />}
        <p>{data?.postContent}</p>
        <Space className="text-right w-full justify-end">
          <span>
            <MessageOutlined />
            &nbsp;
            {data?.commentUserVoList.length || 0}
          </span>
          <span>
            <EyeOutlined />
            &nbsp;
            {data?.views || 0}
          </span>
          <span>{data?.date || "2024-06-21 19:20:54"}</span>
        </Space>
      </div>
      <div
        className="box-shadow w box-border p-8"
        style={{ marginTop: "20px" }}
      >
        <h4>评论区</h4>
        <div className="flex flex-row items-center">
          <Input
            placeholder="请输入评论内容"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="primary" className="ml-2" onClick={addComment}>
            发布评论
          </Button>
        </div>
        {data?.commentUserVoList.map((item: any) => (
          <div
            style={{ borderBottom: "4px solid #eee", paddingBottom: "10px" }}
          >
            <p className="flex flex-row items-center">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
                className="w-8 h-8 rounded-full mr-2"
              />
              {item.username}&nbsp;&nbsp;{item?.commentTime}
            </p>
            <span className="pl-10">{item?.commentContent}</span>
          </div>
        ))}
      </div>
    </>
  );
}
