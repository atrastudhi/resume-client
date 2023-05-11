import { Modal, Form, Input, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';

const baseRules = [{ required: true, message: 'Fields is required' }];

const ExperienceModal = ({
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
        startDate: moment(initialValues.startDate),
      };
      if (initialValues.endDate) newValue.endDate = moment(initialValues.endDate);
      setMapInitialValues(newValue);
      form.setFieldsValue(newValue);
    }
  }, [initialValues, form]);

  return(
    <>
      <Modal
        title="Experience"
        open={isOpen}
        onOk={() => onSubmit(mapInitialValues)}
        onCancel={onCancel}
        confirmLoading={isLoading}
      >
        <Form
          form={form}
          name="experience_form"
          initialValues={mapInitialValues}
          labelCol={{
            span: 6
          }}
        >
          <Form.Item
            name="company"
            label="Company"
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
            name="startDate"
            label="Start Date"
            rules={baseRules}
          >
            <DatePicker  />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
          >
            <DatePicker  />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={baseRules}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ExperienceModal;