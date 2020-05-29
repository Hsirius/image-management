import { Button, Form, Input, Radio, Select } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React from "react";
import TagComponent from "../components/tagComponent";
import styles from "./index.module.scss";

const { Option } = Select;

const SFTPUpload = () => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const store = useLocalStore(() => ({
    property: "public",
    tagData: ["tag1", "tag2", "tag3"],
    updateTagData: (data: string[]) => {
      store.tagData = data;
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
      <Form.Item label="SFTP主机IP">
        <Form.Item name="ip" className={styles.inline_inp}>
          <Input className={styles.inline_inp} />
        </Form.Item>
        <Form.Item className={styles.inline_btn}>
          <Button type="primary">测试连接</Button>
        </Form.Item>
      </Form.Item>
      <Form.Item name="port" label="端口号">
        <Input className={styles.inline_inp} />
      </Form.Item>
      <Form.Item label="根路径">
        <Form.Item name="path" className={styles.inline_inp}>
          <Input className={styles.inline_inp} />
        </Form.Item>
        <Form.Item className={styles.inline_btn}>
          <Button>...</Button>
        </Form.Item>
        <Form.Item className={styles.noMargin}>
          <Button type="primary">自动检测</Button>
        </Form.Item>
      </Form.Item>
      <Form.Item name="username" label="用户名">
        <Input className={styles.inline_inp} />
      </Form.Item>
      <Form.Item name="type" label="认证类型">
        <Select className={styles.inline_inp}>
          <Option value="密码">密码</Option>
        </Select>
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input className={styles.inline_inp} />
      </Form.Item>
      <Form.Item name="tag" label="影像标签">
        <TagComponent
          sourceData={store.tagData}
          refreshData={store.updateTagData}
        />
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

export default SFTPUpload;
