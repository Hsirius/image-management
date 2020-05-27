import { Avatar, List, Card, Row, Col } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { FC } from "react";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { TableProps } from ".";

const { Meta } = Card;

interface ImgListProps {
  data: TableProps[];
}

const ImgList: FC<ImgListProps> = ({ data }) => {
  const store = useLocalStore(() => ({}));
  return useObserver(() => (
    <Row gutter={16}>
      {data.map((item) => (
        <Col key={item.name} span={6}>
          <Card
            style={{ width: 300, margin: "auto " }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta title="Card title" description="This is the description" />
          </Card>
        </Col>
      ))}
    </Row>
  ));
};
export default ImgList;
