import { useObserver, useLocalStore } from "mobx-react-lite";
import React from "react";
import { Form, Upload, Button, Radio, Input, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { RadioChangeEvent } from "antd/lib/radio";
import TagComponent from "../components/tagComponent";
import { localUpload } from "../../service/Upload";
import { UploadFile } from "antd/lib/upload/interface";

const LocalUpload = () => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onFinish = (values: any) => {
    const formData = new FormData();
    store.fileList.forEach((file: any) => {
      formData.append("files", file);
    });
    localUpload(formData)
      .then((res) => {
        message.success("上传成功");
      })
      .catch(() => {
        message.error("上传失败");
      });
  };
  const store = useLocalStore(() => ({
    property: "public",
    tagData: ["tag1", "tag2", "tag3"],
    fileList: [] as UploadFile[],
    updateTagData: (data: string[]) => {
      store.tagData = data;
    },
    handleBeforeUpload: (file: UploadFile) => {
      store.fileList.push(file);
      return false;
    },
  }));
  return useObserver(() => (
    <Form
      className={styles.form}
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        ["radio-group"]: "public",
      }}
    >
      <Form.Item label="上传图片">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            name="files"
            multiple
            fileList={store.fileList}
            accept=".tiff,.jpg,.png"
            beforeUpload={store.handleBeforeUpload}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或者拖拽文件到这里上传</p>
            <p className="ant-upload-hint">支持扩展名：.tiff .jpg .png</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item name="tag" label="影像标签">
        <TagComponent
          sourceData={store.tagData}
          refreshData={store.updateTagData}
        />
      </Form.Item>
      <Form.Item name="source" label="数据来源">
        <Input />
      </Form.Item>
      <Form.Item
        name="radio-group"
        label="文件属性"
        help={
          store.property === "public"
            ? "所有人都可以访问到该影像数据"
            : "只有自己可以访问到该影像数据"
        }
      >
        <Radio.Group
          onChange={(e: RadioChangeEvent) => {
            store.property = e.target.value;
          }}
        >
          <Radio value="public">公开</Radio>
          <Radio value="private">私有</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          上传
        </Button>
      </Form.Item>
    </Form>
  ));
};

export default LocalUpload;
