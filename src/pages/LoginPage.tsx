import type { FormProps } from "antd";

import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

type Inputs = {
  email: string;
  password: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();
  console.log("error", error);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      email: "mehadi@gmail.com",
      password: "123456",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);
    console.log(user);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };

  return (
    <div className="mx-auto flex justify-center items-center mt-12 h-[calc(100vh-384px)]">
      <div className="bg-purple-300  p-6 md:px-8 py-12  rounded-lg shadow-xl">
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
            <Input {...register("email")} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            required={false}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password {...register("password")} />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="button-card" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center">
          New to Car-expert? Please{" "}
          <Link
            className="text-purple-800 font-semibold hover:font-bold"
            to="/sign-up"
          >
            Sign Up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
