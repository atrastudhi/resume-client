import { Modal, Form, Input, Typography, Button, Space } from 'antd'
import { useState } from 'react';
import service from '../../common/service/base_service';
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SkillComponent = ({ skills, refreshData }) => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const addSkill = async () => {
    try {
      setIsLoading(true)
      const { skill } = await form.validateFields();

      await service.post('/skill', { name: skill });

      setIsOpen(false)
      refreshData();
    } catch (err) {
      console.error('failed validate fields', err);
    } finally {
      setIsLoading(false);
      form.resetFields();
    }
  };

  const deleteSkill = async (id) => {
    try {
      setIsLoading(true);
      await service.delete(`/skill/${id}`)
      refreshData();
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <>
      <Title level={4} style={{ color: '#40a9ff' }}>
        SKILLS
        <Button size='small' style={{ marginLeft: 10 }} icon={<PlusSquareOutlined />} onClick={() => setIsOpen(true)}/>
      </Title>
      <Space direction='vertical' size="middle">
        {skills.map((skill) => (
          <div key={skill.id}>
            <Text>{skill.name}</Text>
            <Button size='small' style={{ marginLeft: 10 }} icon={<DeleteOutlined />} onClick={() => deleteSkill(skill.id)} danger />
          </div>
        ))}
      </Space>
      <Title level={4} style={{ color: '#40a9ff' }}>LANGUAGES</Title>
      <Text>Bahasa & English</Text>
      <Title level={4} style={{ color: '#40a9ff' }}>LINK & REFERENCES</Title>
      <Space direction='vertical'>
        <Text italic underline>https://wwww.linkedin.com/in/atras-tudhi-b483b0172</Text>
        <Text italic underline>https://github.com/atrastudhi</Text>
        <Text italic underline>https://atrastudhi.xyz</Text>
      </Space>
      <Modal
        title="Add Skill"
        open={isOpen}
        onOk={addSkill}
        onCancel={() => setIsOpen(false)}
        confirmLoading={isLoading}
      >
        <Form 
          form={form}
          name="skill_form"
        >
          <Form.Item
            name="skill"
            rules={[{ required: true, message: 'Fields is required' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* <Button type="primary" onClick={(() => setIsOpen(true))}>Create Skill</Button> */}
    </>
  )
}

export default SkillComponent;