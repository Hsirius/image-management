import { InfoCircleOutlined } from "@ant-design/icons";
import { Divider, Popconfirm, Table, message, Tag } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { ReactText, FC } from "react";
import styles from "./index.module.scss";
import EditModel from "./editModel";
import { Link } from "react-router-dom";
import { ImgDataListProps, deleteImg } from "../../service/Home";

interface ImgTableProps {
  data: ImgDataListProps[];
  loading: boolean;
  onRefresh: () => void;
}

const ImgTable: FC<ImgTableProps> = ({ data, loading, onRefresh }) => {
  const store = useLocalStore(() => ({
    visible: false,
    currentData: {} as ImgDataListProps,
    selectedRowKeys: [] as ReactText[],
    onSelectChange: (selectedRowKeys: ReactText[]) => {
      store.selectedRowKeys = selectedRowKeys;
    },
    clearSelected: () => {
      store.selectedRowKeys = [];
    },
    edit: (record: ImgDataListProps) => {
      store.visible = true;
      store.currentData = record;
    },
    delete: (id: number) => {
      deleteImg(id).then(() => {
        message.success("成功删除");
        onRefresh();
      });
    },
  }));
  const columns = [
    {
      title: "缩略图",
      dataIndex: "thumb",
      render: (imgUrl: string, record: ImgDataListProps) => (
        <Link to={`/detail/${record.id}`}>
          <img src={imgUrl} className={styles.img} />
        </Link>
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
      render: (tags: string[]) => (
        <>
          {tags &&
            tags.map((tag) => (
              <Tag color="geekblue" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            ))}
        </>
      ),
    },
    {
      title: "录入时间",
      dataIndex: "createTime",
    },
    {
      title: "属性",
      dataIndex: "attr",
    },
    {
      title: "操作",
      key: "action",
      render: (text: string, record: ImgDataListProps) => (
        <>
          <a onClick={() => store.edit(record)}>编辑</a>
          <Divider type="vertical" />
          <a>下载</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => store.delete(record.id)}
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
        rowKey={(record) => record.name}
        loading={loading}
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
