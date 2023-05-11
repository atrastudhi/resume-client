import { Form, Space, Typography, Button } from 'antd';
import { useState } from 'react';
import moment from 'moment';

import service from '../../common/service/base_service';
import ExperienceModal from './components/experience.modal';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ExperienceComponent = ({ experiences, refreshData }) => {
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState({});

  const createModalOnSubmit = async () => {
    try {
      setLoading(true)
      const fields = await createForm.validateFields();
      const payload = {
        ...fields,
        startDate: fields.startDate.format('YYYY-MM-DD'),
      };
      if (fields.endDate) payload.endDate = fields.endDate.format('YYYY-MM-DD');

      await service.post('/experience', payload);

      setCreateModal(false);
      createForm.resetFields();
      refreshData();
    } catch (err) {
      console.error('failed validate fields', err);
    } finally {
      setLoading(false);
    }
  };

  const updateModalOnSubmit = async ({ id }) => {
    try {
      setLoading(true)
      const fields = await updateForm.validateFields();
      const payload = {
        ...fields,
        startDate: fields.startDate.format('YYYY-MM-DD'),
      };
      if (fields.endDate) payload.endDate = fields.endDate.format('YYYY-MM-DD');

      await service.put(`/experience/${id}`, payload);

      setUpdateModal(false)
      refreshData();
    } catch (err) {
      console.error('failed validate fields', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteExperience = async (id) => {
    try {
      setLoading(true);
      await service.delete(`/experience/${id}`);
      refreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const onClickUpdateExperience = (experience) => {
    setSelectedExperience(experience);
    setUpdateModal(true);
  }

  const experienceSpace = (experience) => (
    <div key={experience.id}>
      <Text strong style={{ fontSize: '20px' }}>{experience.company} - </Text>
      <Text italic style={{ fontSize: '15px' }}>{experience.position}</Text>
      <Button size='small' style={{ marginLeft: 5 }} icon={<EditOutlined />} onClick={() => onClickUpdateExperience(experience)}/>
      <Button size='small' style={{ marginLeft: 5 }} icon={<DeleteOutlined />} onClick={() => deleteExperience(experience.id)} danger />
      <br/>
      <Space direction='vertical'>
        <Text>{moment(experience.startDate).format('MMMM YYYY')} - {experience.endDate ? moment(experience.endDate).format('MMMM YYYY') : 'Present'}</Text>
        <Paragraph>{experience.description}</Paragraph>
      </Space>
    </div>
  );

  return (
    <>
      <Title level={4} style={{ color: '#40a9ff' }}>
        EXPERIENCE 
        <Button size='small' style={{ marginLeft: 10 }} icon={<PlusSquareOutlined />} onClick={() => setCreateModal(true)}/>
      </Title>
      <Space direction='vertical'>
        {experiences.map((experience) => experienceSpace(experience))}
      </Space>
      <ExperienceModal
        isOpen={createModal}
        onSubmit={createModalOnSubmit}
        onCancel={(() => setCreateModal(false))}
        isLoading={loading}
        form={createForm}
      />
      <ExperienceModal
        isOpen={updateModal}
        onSubmit={updateModalOnSubmit}
        onCancel={(() => setUpdateModal(false))}
        isLoading={loading}
        form={updateForm}
        initialValues={selectedExperience}
      />
    </>
  );
}

export default ExperienceComponent;