import { Form, Input, Select } from "antd";
import React from "react";
import {
  Controller,
  ControllerRenderProps,
  RegisterOptions,
} from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface CWInputProps {
  type: string;
  name: string;
  label?: string | React.ReactNode;
  rules?: RegisterOptions;
  defaultValue?: string | any;
  [key: string]: any;
}

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="88">+88</Option>
      <Option value="91">+91</Option>
      <Option value="92">+92</Option>
    </Select>
  </Form.Item>
);

const CWInput: React.FC<CWInputProps> = ({
  type,
  name,
  label,
  rules,
  placeholder,
  defaultValue,
}) => {
  const renderInput = (field: ControllerRenderProps) => {
    switch (type) {
      case "password":
        return (
          <Input.Password
            {...field}
            type={type}
            id={name}
            placeholder={placeholder}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        );
      case "email":
        return (
          <Input
            {...field}
            placeholder={placeholder}
            type={type}
            id={name}
            defaultValue={defaultValue}
          />
        );
      case "phone":
        return (
          <Input
            addonBefore={prefixSelector}
            style={{ width: "100%" }}
            {...field}
            placeholder={placeholder}
            type={type}
            id={name}
          />
        );
      default:
        return (
          <Input
            {...field}
            placeholder={placeholder}
            type={type}
            id={name}
            defaultValue={defaultValue}
          />
        );
    }
  };

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            {renderInput(field)}
            {fieldState.error && (
              <span style={{ color: "red" }}>{fieldState.error.message}</span>
            )}
          </>
        )}
      />
    </>
  );
};

export default CWInput;
