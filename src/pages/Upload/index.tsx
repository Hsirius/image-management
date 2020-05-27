import React from "react";
import { useObserver } from "mobx-react-lite";
import Header from "../components/header";
import { Tabs, Card } from "antd";
import LocalUpload from "./local";
import SFTPUpload from "./sftp";
import ServiceUpload from "./service";

const { TabPane } = Tabs;

const Upload = () => {
  const tabs = [
    {
      id: "0",
      title: "本地上传",
      component: <LocalUpload />,
    },
    {
      id: "1",
      title: "SFTP文件导入",
      component: <SFTPUpload />,
    },
    {
      id: "2",
      title: "服务器上传",
      component: <ServiceUpload />,
    },
  ];
  return useObserver(() => (
    <>
      <Header />
      <Card title="上传影像" bordered={false}>
        <Tabs defaultActiveKey="0">
          {tabs.map((item) => (
            <TabPane tab={item.title} key={item.id}>
              {item.component}
            </TabPane>
          ))}
        </Tabs>
      </Card>
    </>
  ));
};

export default Upload;
