import { DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

const baseRules = [{ required: true, message: 'Fields is required' }];

const EducationModal = ({
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

  return (
    <>
      <Modal
        title="Education"
        open={isOpen}
        onOk={() => onSubmit(mapInitialValues)}
        onCancel={onCancel}
        confirmLoading={isLoading}
      >
        <Form
          form={form}
          name="education_form"
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
            name="major"
            label="Major"
            rules={baseRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={baseRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={baseRules}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
};

export default EducationModal;