import { LeftOutlined } from "@ant-design/icons";
import { Button, Collapse, Form } from "antd";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { useEffect, FC } from "react";
import styles from "./index.module.scss";
import { RouteComponentProps } from "react-router-dom";
import { getImgInfoById, ImgDataListProps } from "../../service/Home";

const { Panel } = Collapse;

interface LabelProps {
  id: string;
  name: string;
  type: string;
}

/* eslint no-underscore-dangle: 0 */
const ImgDetail: FC<RouteComponentProps<{ imgId: string }>> = ({
  match: {
    params: { imgId },
  },
}) => {
  const store = useLocalStore(() => ({
    map: {} as L.Map,
    data: {} as ImgDataListProps,
    layerLists: [] as any,
    labelLists: [] as LabelProps[],
    editLabelId: "", // 当前编辑的label id
    editLabelVal: "", // 编辑后的label val
    initData: () => {
      getImgInfoById(Number(imgId)).then((res) => {
        store.data = res.data.list[0];
        // 初始化map
        store.initMap(store.data.thumb);
      });
    },
    initMap: (img: string) => {
      const map = L.map(`map`, {
        minZoom: 10,
        maxZoom: 19,
        center: [0, 0],
        zoom: 15,
        crs: L.CRS.Simple,
      });
      const w = 4000;
      const h = 3000;
      // calculate the edges of the image, in coordinate space
      const southWest = map.unproject([0, h], map.getMaxZoom() - 1);
      const northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
      const bounds = new L.LatLngBounds(southWest, northEast);
      // add the image overlay,
      // so that it covers the entire map
      L.imageOverlay(img, bounds).addTo(map);
      // tell leaflet that the map is exactly as big as the image
      map.setMaxBounds(bounds);
      store.map = map;
    },
  }));
  const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  };
  useEffect(() => {
    store.initData();
  }, [imgId]);

  return useObserver(() => (
    <>
      <section className={styles.header}>
        <LeftOutlined
          className={styles.back_icon}
          onClick={() => history.go(-1)}
        />
        <span className={styles.title}>{store.data.name}</span>
      </section>
      <section className={styles.content_box}>
        <div className={styles.tools}>
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="波段选择" key="1">
              <Form name="basic" {...layout} className={styles.desc}>
                <Form.Item label="图像宽度">1920</Form.Item>
                <Form.Item label="图像高度">1920</Form.Item>
                <Form.Item label="波段数">1920</Form.Item>
                <Form.Item label="传感器">1920</Form.Item>
                <Form.Item label="图像格式">1920</Form.Item>
                <Form.Item label="中心经度">1920</Form.Item>
                <Form.Item label="中心维度">1920</Form.Item>
                <Form.Item label="分辨率">1920</Form.Item>
              </Form>
            </Panel>
            <Panel header="色阶调整" key="2">
              <p>asdf</p>
            </Panel>
            <Panel header="详细信息" key="3">
              <p>asdf</p>
            </Panel>
          </Collapse>
        </div>
        <div className={styles.map_box}>
          <div id="map" className={styles.map} />
          <div className={styles.btn_group}>
            <Button>删除</Button>
            <Button type="primary">下载</Button>
          </div>
        </div>
      </section>
    </>
  ));
};

export default ImgDetail;
