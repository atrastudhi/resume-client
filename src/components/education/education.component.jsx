import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Typography, Button, Space, Form } from 'antd';
import moment from 'moment';
import EducationModal from './components/education.modal';
import { useState } from 'react';
import service from '../../common/service/base_service';

const { Title, Text } = Typography;

const EducationComponent = ({ educations, refreshData }) => {
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState({});

  const createModalOnSubmit = async () => {
    try {
      setLoading(true)
      const fields = await createForm.validateFields();
      const payload = {
        ...fields,
        startDate: fields.startDate.format('YYYY-MM-DD'),
      };
      if (fields.endDate) payload.endDate = fields.endDate.format('YYYY-MM-DD');

      await service.post('/education', payload);

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

      await service.put(`/education/${id}`, payload);

      setUpdateModal(false)
      refreshData();
    } catch (err) {
      console.error('failed validate fields', err);
    } finally {
      setLoading(false);
    }
  }

  const deleteEducation = async (id) => {
    try {
      setLoading(true);
      await service.delete(`/education/${id}`);
      refreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const onClickUpdateEducation = (education) => {
    setSelectedEducation(education);
    setUpdateModal(true);
  }

  const educationSpace = (education) => (
    <div key={education.id}>
      <Text strong style={{ fontSize: '20px' }}>{education.name} - </Text>
      <Text italic style={{ fontSize: '15px' }}>{education.major}</Text>
      <Button size='small' style={{ marginLeft: 5 }} icon={<EditOutlined />} onClick={() => onClickUpdateEducation(education)} />
      <Button size='small' style={{ marginLeft: 5 }} icon={<DeleteOutlined />} onClick={() => deleteEducation(education.id)} danger />
      <br/>
      <Space direction='vertical'>
        <Text>{education.status}</Text>
        <Text>{moment(education.startDate).format('MMMM YYYY')} - {education.endDate ? moment(education.endDate).format('MMMM YYYY') : 'Present'}</Text>
      </Space>
    </div>
  );

  return (
    <>
      <Title level={4} style={{ color: '#40a9ff' }}>
        EDUCATION 
        <Button size='small' style={{ marginLeft: 10 }} icon={<PlusSquareOutlined />} onClick={() => setCreateModal(true)} />
      </Title>
      <Space direction='vertical'>
        {educations.map((education) => educationSpace(education))}
      </Space>
      <EducationModal
        isOpen={createModal}
        onSubmit={createModalOnSubmit}
        onCancel={(() => setCreateModal(false))}
        isLoading={loading}
        form={createForm}
      />
      <EducationModal
        isOpen={updateModal}
        onSubmit={updateModalOnSubmit}
        onCancel={(() => setUpdateModal(false))}
        isLoading={loading}
        form={updateForm}
        initialValues={selectedEducation}
      />
    </>
  )
};

export default EducationComponent;