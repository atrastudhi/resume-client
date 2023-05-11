import { Modal, Form, Input, Row, Col, Typography, Space, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react';

import service from '../../common/service/base_service';

const baseRules = [{ required: true, message: 'This fields is required!' }];
const { Title, Paragraph, Text } = Typography

const OverallComponent = ({ overall, refreshData }) => {
  const [form] = Form.useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateOverall = async () => {
    try {
      setIsLoading(true)
      const payload = await form.validateFields();

      await service.put(`/overall`, payload);

      refreshData();
      setIsOpen(false);
    } catch (err) {
      console.error('failed validate fields', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col span={9} offset={4}>
          <Space align="center" size="middle">
            <Title>{overall.name}</Title>
            <Button icon={<EditOutlined />} onClick={() => setIsOpen(true)}/>
          </Space>
          <Paragraph>{overall.about}</Paragraph>
        </Col>
        <Col span={4} offset={3}>
          <Title level={4} style={{ color: '#40a9ff' }}>CONTACT</Title>
          <Space direction='vertical'>
            <Text strong>{overall.phoneNumber}</Text>
            <Text strong underline>{overall.email}</Text>
            <Text strong>{overall.address}</Text>
          </Space>
        </Col>
      </Row>
      <Modal
        title="Edit Data"
        open={isOpen}
        onOk={updateOverall}
        onCancel={() => setIsOpen(false)}
        confirmLoading={isLoading}
      >
        <Form
          form={form}
          name='overall_form'
          initialValues={overall}
          labelCol={{
            span: 6
          }}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              baseRules[0],
              {
                max: 27,
                message: 'Full Name react maximum character!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="about"
            label="About"
            rules={baseRules}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={baseRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={baseRules}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OverallComponent;
