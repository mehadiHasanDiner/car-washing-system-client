import type { FormProps } from "antd";

import { Button, Form, Input, Select } from "antd";
import React from "react";
import { Link } from "react-router-dom";

type FieldType = {
  name?: string;
  phone?: number;
  address?: string;
  email?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

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

const SignUpPage: React.FC = () => {
  return (
    <div className="mx-auto flex justify-center items-center mt-16 h-[calc(100vh-400px)]">
      <div className="bg-purple-300  p-6 md:p-8  rounded-lg shadow-xl">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            required={false}
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="E-mail"
            name="email"
            required={false}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            required={false}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Phone"
            name="phone"
            required={false}
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Address"
            name="address"
            required={false}
            rules={[
              { required: true, message: "Please input your present address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="button-card" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center">
          Already have an account? Please{" "}
          <Link
            className="text-purple-800 font-semibold hover:font-bold"
            to="/login"
          >
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
