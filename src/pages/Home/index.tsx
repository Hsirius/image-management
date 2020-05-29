import {
  AppstoreOutlined,
  CloudUploadOutlined,
  DownOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Input, Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import imgUrl from "./img.jpg";
import ImgList from "./imgList";
import ImgTable from "./imgTable";
import styles from "./index.module.scss";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { getImgData, ImgDataListProps } from "../../service/Home";

const { Search } = Input;
const CheckboxGroup = Checkbox.Group;
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
    searchVal: "", // 搜索名称
    data: [] as ImgDataListProps[],
    listType: "table", //  切换列表状态
    startTime: "",
    endTime: "",
    loading: false,
    checkAllType: false,
    indeterminateType: true,
    checkAllName: false,
    indeterminateName: true,
    activeTypes: [] as string[],
    activeNames: [] as string[],
    typeList: ["CCD", "SAR", "IRS"],
    nameList: ["JB-5", "JB-6", "JB-7", "GF-2", "GF-3"],
    initData: () => {
      store.loading = true;
      const params = {
        name: store.searchVal,
        all_return: true,
        start_time: store.startTime,
        end_time: store.endTime,
      };
      getImgData(params).then((res) => {
        store.loading = false;
        store.data = res.data.list;
      });
    },
    filterTime: (dates: any, dateStrings: [string, string]) => {
      [store.startTime, store.endTime] = dateStrings;
      store.initData();
    },
    typeAllChange: (e: CheckboxChangeEvent) => {
      store.activeTypes = e.target.checked ? store.typeList : [];
      store.indeterminateType = false;
      store.checkAllType = e.target.checked;
    },
    changeType: (checkedList: any) => {
      store.activeTypes = checkedList;
      store.indeterminateType =
        !!checkedList.length && checkedList.length < store.typeList.length;
      store.checkAllType = checkedList.length === store.typeList.length;
    },
    nameAllChange: (e: CheckboxChangeEvent) => {
      store.activeNames = e.target.checked ? store.nameList : [];
      store.indeterminateName = false;
      store.checkAllName = e.target.checked;
    },
    changeName: (checkedList: any) => {
      store.activeNames = checkedList;
      store.indeterminateName =
        !!checkedList.length && checkedList.length < store.nameList.length;
      store.checkAllName = checkedList.length === store.nameList.length;
    },
  }));
  useEffect(() => {
    store.initData();
  }, []);
  return useObserver(() => (
    <div className={styles.main_box}>
      <div className={styles.content}>
        <section className={styles.search_box}>
          <Search
            className={styles.search_inp}
            placeholder="请输入影像名称或ID"
            size="large"
            onSearch={(value) => {
              store.searchVal = value;
              store.initData();
            }}
            enterButton
          />
        </section>
        <section className={styles.filter_group}>
          <div className={styles.filter_item}>
            <p>传感器类型：</p>
            <Checkbox
              onChange={store.typeAllChange}
              indeterminate={store.indeterminateType}
              checked={store.checkAllType}
            >
              全部
            </Checkbox>
            <CheckboxGroup
              options={store.typeList}
              value={store.activeTypes}
              onChange={store.changeType}
            />
            <a>
              展开 <DownOutlined />
            </a>
          </div>
          <div className={styles.filter_item}>
            <p>传感器名称：</p>
            <Checkbox
              onChange={store.nameAllChange}
              indeterminate={store.indeterminateName}
              checked={store.checkAllName}
            >
              全部
            </Checkbox>
            <CheckboxGroup
              options={store.nameList}
              value={store.activeNames}
              onChange={store.changeName}
            />
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
            <ImgTable
              data={store.data}
              onRefresh={store.initData}
              loading={store.loading}
            />
          ) : (
            <ImgList data={store.data} />
          )}
        </section>
      </div>
    </div>
  ));
};

export default IndexList;
