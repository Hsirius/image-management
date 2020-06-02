import React, { FC, useEffect, useState } from "react";
import { useObserver } from "mobx-react-lite";
import { Modal, Form, Input } from "antd";
import { ImgDataListProps } from "../../service/Home";

interface EditModelProps {
  visible: boolean;
  data: ImgDataListProps;
  onCancel: () => void;
  onOk: () => void;
}

const EditModel: FC<EditModelProps> = ({ visible, data, onCancel, onOk }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const onFinish = (values: ImgDataListProps) => {
    setSubmitting(true);
    setSubmitting(false);
    onOk();
  };
  useEffect(() => {
    form.resetFields();
  }, [visible]);
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="编辑影像信息"
      onOk={form.submit}
      okButtonProps={{ loading: submitting }}
      maskClosable={!submitting}
    >
      <Form
        // @ts-ignore
        onFinish={onFinish}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={data}
      >
        <Form.Item label="影像名称" required name="name">
          <Input />
        </Form.Item>
        <Form.Item label="数据来源" required name="source">
          <Input />
        </Form.Item>
        <Form.Item label="数据属性" required name="attr">
          <Input />
        </Form.Item>
        <Form.Item label="影像标签" name="tag">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModel;
