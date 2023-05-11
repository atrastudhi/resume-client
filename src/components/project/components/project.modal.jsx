import { DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

const baseRules = [{ required: true, message: 'Fields is required' }];

const ProjectModal = ({
  isOpen,
  onSubmit,
  onCancel,
  isLoading,
  form,
  initialValues,
}) => {
  const [mapInitialValues, setMapInitialValues] = useState({});

  useEffect(() => {
    if (initialValues) {
      const newValue = {
        ...initialValues,
        date: moment(initialValues.date),
      };
      setMapInitialValues(newValue);
      form.setFieldsValue(newValue);
    }
  }, [initialValues, form]);

  return (
    <>
      <Modal
        title="Project"
        open={isOpen}
        onOk={() => onSubmit(mapInitialValues)}
        onCancel={onCancel}
        confirmLoading={isLoading}
      >
        <Form
          form={form}
          name="project_form"
          initialValues={mapInitialValues}
          labelCol={{
            span: 6
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={baseRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={baseRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={baseRules}
          >
            <DatePicker  />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={baseRules}
          >
            <Input.TextArea  />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
};

export default ProjectModal;