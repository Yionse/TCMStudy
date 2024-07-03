import { getList } from "@/apis/list";
import { useNavigate } from "react-router-dom";
import { MessageOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, message } from "antd";
import "./index.less";
import { useContext, useRef, useState } from "react";
import { fetchAddDiscussion } from "@/apis/operator";
import { UserInfoContext } from "@/contexts/UserInfo";

export default function DiscussPage() {
  const { data: postsList, refetch } = getList();
  const navigate = useNavigate() as any;
  const [visible, setVisible] = useState(false);
  const [postContent, setPostContent] = useState("");
  const { mutateAsync } = fetchAddDiscussion();
  const { userInfo } = useContext(UserInfoContext);
  const submitHandler = async () => {
    if (postContent.trim() === "") {
      message.error("请输入帖子内容");
      return;
    }
    await mutateAsync({
      userId: userInfo.id,
      postContent,
      imageName: fileName.current || "",
      views: 0,
      // date: new Date().toLocaleString(),
    });
    await refetch();
    setVisible(false);
    setPostContent("");
    message.success("发布成功");
  };
  const fileName = useRef();
  function uploadImage() {
    const formData = new FormData();
    const fileInput = document.getElementById("fileInput") as any;
    formData.append("file", fileInput.files[0]);
    const testArr = fileInput.value.split("\\");
    fileName.current = testArr[testArr.length - 1];

    fetch("http://localhost:8080/SSM/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        // alert(result);
        message.success("上传成功");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("上传失败");
      });
  }
  return (
    <div className="w" style={{ marginTop: "20px" }}>
      <Button
        type="primary"
        onClick={() => {
          if (!userInfo.id) {
            message.error("请先登录");
            return;
          }
          setVisible(true);
        }}
      >
        发布帖子
      </Button>
      {postsList?.map((item: any) => (
        <div
          className="box-shadow box-border p-4 my-4 discuss-item"
          onClick={() => navigate("/discussDetail", { state: { id: item.id } })}
        >
          {item?.imageName && (
            <img src={item.imageName} alt="" className="h-28" />
          )}
          <p
            style={{
              borderBottom: "1px solid #ccc",
              fontSize: "18px",
              fontWeight: "bold",
              paddingBottom: "6px",
            }}
          >
            {item.postContent}
          </p>
          <Space className="text-right w-full justify-end">
            <span>
              <MessageOutlined />
              &nbsp;
              {item.commentUserVoList.length || 0}
            </span>
            <span>
              <EyeOutlined />
              &nbsp;
              {item.views || 0}
            </span>
            <span>{item?.date || "2024-06-21 19:20:54"}</span>
          </Space>
        </div>
      ))}
      <Modal
        title="发布帖子"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div className="my-2">
          <form id="uploadForm" enctype="multipart/form-data">
            <input type="file" name="file" id="fileInput" required />
            <Button onClick={uploadImage}>上传</Button>
          </form>
        </div>
        <label className="flex flex-col justify-center my-4">
          <span style={{ width: "300px" }}>请输入帖子内容：</span>
          <Input
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="请输入帖子内容"
          />
        </label>
        <Button type="primary" onClick={submitHandler}>
          确定
        </Button>
      </Modal>
    </div>
  );
}
