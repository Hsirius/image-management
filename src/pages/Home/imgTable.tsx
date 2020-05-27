import { InfoCircleOutlined } from "@ant-design/icons";
import { Divider, Popconfirm, Table, message } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { ReactText, FC } from "react";
import styles from "./index.module.scss";
import { TableProps } from ".";
import EditModel from "./editModel";

interface ImgTableProps {
  data: TableProps[];
  onRefresh: () => void;
}

const ImgTable: FC<ImgTableProps> = ({ data, onRefresh }) => {
  const store = useLocalStore(() => ({
    visible: false,
    currentData: {} as TableProps,
    selectedRowKeys: [] as ReactText[],
    onSelectChange: (selectedRowKeys: ReactText[]) => {
      store.selectedRowKeys = selectedRowKeys;
    },
    clearSelected: () => {
      store.selectedRowKeys = [];
    },
    edit: (record: TableProps) => {
      store.visible = true;
      store.currentData = record;
    },
    delete: (name: string) => {
      message.success("成功删除");
      onRefresh();
    },
    toDetail: (imgUrl: string) => {
      console.log(imgUrl);
    },
  }));
  const columns = [
    {
      title: "缩略图",
      dataIndex: "img",
      render: (imgUrl: string) => (
        <img
          src={imgUrl}
          className={styles.img}
          onClick={() => store.toDetail(imgUrl)}
        />
      ),
    },
    {
      title: "影像名称",
      dataIndex: "name",
    },
    {
      title: "数据来源",
      dataIndex: "source",
    },
    {
      title: "录入员",
      dataIndex: "reporter",
    },
    {
      title: "影像标签",
      dataIndex: "tag",
    },
    {
      title: "录入时间",
      dataIndex: "time",
    },
    {
      title: "属性",
      dataIndex: "attr",
    },
    {
      title: "操作",
      key: "action",
      render: (text: string, record: TableProps) => (
        <>
          <a onClick={() => store.edit(record)}>编辑</a>
          <Divider type="vertical" />
          <a>下载</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => store.delete(record.name)}
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  return useObserver(() => (
    <>
      {store.selectedRowKeys.length > 0 && (
        <section className={styles.select_box}>
          <div>
            <InfoCircleOutlined style={{ color: "#4091F7", marginRight: 5 }} />
            <span>已选择</span>
            <span className={styles.select_length}>
              {store.selectedRowKeys.length}
            </span>
            <span>项</span>
          </div>
          <div className={styles.actions}>
            <a>下载</a>
            <Popconfirm title="确定删除吗？">
              <a>删除</a>
            </Popconfirm>
            <a onClick={store.clearSelected}>清空</a>
          </div>
        </section>
      )}
      <Table
        rowKey="name"
        rowSelection={{
          selectedRowKeys: store.selectedRowKeys,
          onChange: store.onSelectChange,
        }}
        pagination={{ showQuickJumper: true }}
        columns={columns}
        dataSource={data}
      />
      <EditModel
        visible={store.visible}
        data={store.currentData}
        onCancel={() => (store.visible = false)}
        onOk={() => {
          store.visible = false;
          onRefresh();
        }}
      />
    </>
  ));
};
export default ImgTable;
