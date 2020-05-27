import {
  AppstoreOutlined,
  DownOutlined,
  UnorderedListOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Input, Upload } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { useEffect, FC } from "react";
import Header from "../components/header";
import ImgList from "./imgList";
import ImgTable from "./imgTable";
import styles from "./index.module.scss";
import imgUrl from "./img.jpg";
import { RouteComponentProps } from "react-router-dom";

const { Search } = Input;
const { RangePicker } = DatePicker;

export interface TableProps {
  img: string;
  name: string;
  source: string;
  reporter: string;
  tag: string[];
  time: string;
  attr: string;
}

const IndexList: FC<RouteComponentProps> = ({ history }) => {
  const store = useLocalStore(() => ({
    searchVal: "",
    data: [] as TableProps[],
    listType: "table",
    typeList: [
      { label: "all", value: "全部" },
      { label: "CCD", value: "CCD" },
      { label: "SAR", value: "SAR" },
      { label: "IRS", value: "IRS" },
    ],
    nameList: [
      { label: "all", value: "全部" },
      { label: "JB-5", value: "JB-5" },
      { label: "JB-6", value: "JB-6" },
      { label: "JB-7", value: "JB-7" },
      { label: "GF-2", value: "GF-2" },
      { label: "GF-3", value: "GF-3" },
    ],
    initData: () => {
      const data = [] as TableProps[];
      for (let i = 0; i < 23; i += 1) {
        data.push({
          img: imgUrl,
          name: `影像${i}`,
          source: "电子所",
          reporter: "张三",
          tag: ["JCD", "SAR"],
          time: "2020-5-26",
          attr: "私有",
        });
      }
      store.data = data;
    },
    onChange: (checkedValues: CheckboxValueType[]) => {
      console.log(checkedValues);
    },
    filterTime: (dates: any, dateStrings: [string, string]) => {
      console.log(dates);
    },
  }));
  useEffect(() => {
    store.initData();
  }, []);
  return useObserver(() => (
    <div className={styles.main_box}>
      <Header />
      <div className={styles.content}>
        <section className={styles.search_box}>
          <Search
            className={styles.search_inp}
            placeholder="请输入影像名称或ID"
            size="large"
            onSearch={(value) => (store.searchVal = value)}
            enterButton
          />
        </section>
        <section className={styles.filter_group}>
          <div className={styles.filter_item}>
            <p>传感器类型：</p>
            {store.typeList.map((item) => (
              <span key={item.label}>{item.value}</span>
            ))}
            <a>
              展开 <DownOutlined />
            </a>
          </div>
          <div className={styles.filter_item}>
            <p>传感器名称：</p>
            {store.nameList.map((item) => (
              <span key={item.label}>{item.value}</span>
            ))}
            <a>
              展开 <DownOutlined />
            </a>
          </div>
          <div className={styles.filter_item}>
            <p>录入时间：</p>
            <RangePicker onChange={store.filterTime} />
          </div>
        </section>
        <section className={styles.table}>
          <div className={styles.title}>
            <div>
              <span>影像列表</span>
              {store.listType === "table" ? (
                <AppstoreOutlined
                  className={styles.common_list}
                  onClick={() => (store.listType = "list")}
                />
              ) : (
                <UnorderedListOutlined
                  className={styles.common_list}
                  onClick={() => (store.listType = "table")}
                />
              )}
            </div>
            <div>
              <Button
                type="primary"
                icon={<CloudUploadOutlined />}
                onClick={() => history.push("/upload")}
              >
                上传数据
              </Button>
            </div>
          </div>
          {store.listType === "table" ? (
            <ImgTable data={store.data} onRefresh={store.initData} />
          ) : (
            <ImgList data={store.data} />
          )}
        </section>
      </div>
    </div>
  ));
};

export default IndexList;
