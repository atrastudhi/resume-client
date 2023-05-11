import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Typography, Button, Space, Form } from 'antd';
import { useState } from 'react';
import moment from 'moment';

import ProjectModal from './components/project.modal';
import service from '../../common/service/base_service';

const { Title, Text, Paragraph } = Typography;

const ProjectComponent = ({ projects, refreshData }) => {
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const createModalOnSubmit = async () => {
    try {
      setIsLoading(true)
      const fields = await createForm.validateFields();
      const payload = {
        ...fields,
        date: moment(fields.date).format('YYYY-MM-DD'),
      };

      await service.post('/project', payload);

      setCreateModal(false);
      createForm.resetFields();
      refreshData();
    } catch (err) {
      console.error('failed validate fields', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateModalOnSubmit = async ({ id }) => {
    try {
      setIsLoading(true)
      const fields = await updateForm.validateFields();
      const payload = {
        ...fields,
        date: fields.date.format('YYYY-MM-DD'),
      };

      await service.put(`/project/${id}`, payload);

      setUpdateModal(false)
      refreshData();
    } catch (err) {
      console.error('failed validate fields', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      setIsLoading(true);
      await service.delete(`/project/${id}`);
      refreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const onClickUpdateProject = (project) => {
    setSelectedProject(project);
    setUpdateModal(true);
  };

  const projectSpace = (project) => (
    <div key={project.id}>
      <Text strong style={{ fontSize: '20px' }}>{project.name} - </Text>
      <Text italic style={{ fontSize: '15px' }}>{project.position}</Text>
      <Button size='small' style={{ marginLeft: 5 }} icon={<EditOutlined />} onClick={() => onClickUpdateProject(project)} />
      <Button size='small' style={{ marginLeft: 5 }} icon={<DeleteOutlined />} onClick={() => deleteProject(project.id)} danger />
      <br/>
      <Space direction='vertical'>
        <Text>{moment(project.date).format('YYYY')}</Text>
        <Paragraph>{project.description}</Paragraph>
      </Space>
    </div>
  );

  return(
    <>
      <Title level={4} style={{ color: '#40a9ff' }}>
        RELEVANT PROJECT
        <Button size='small' style={{ marginLeft: 10 }} icon={<PlusSquareOutlined />} onClick={() => setCreateModal(true)} />
      </Title>
      <Space direction='vertical'>
        {projects.map((project) => projectSpace(project))}
      </Space>
      <ProjectModal
        isOpen={createModal}
        onSubmit={createModalOnSubmit}
        onCancel={(() => setCreateModal(false))}
        isLoading={isLoading}
        form={createForm}
      />
      <ProjectModal
        isOpen={updateModal}
        onSubmit={updateModalOnSubmit}
        onCancel={(() => setUpdateModal(false))}
        isLoading={isLoading}
        form={updateForm}
        initialValues={selectedProject}
      />
    </>
  )
};

export default ProjectComponent;