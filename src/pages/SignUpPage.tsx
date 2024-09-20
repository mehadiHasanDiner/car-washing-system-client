import { Button, Form } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import CWForm from "../components/ui/form/CWForm";
import { SubmitHandler } from "react-hook-form";
import CWInput from "../components/ui/form/CWInput";

type Inputs = {
  email: string;
  password: string;
};

const SignUpPage: React.FC = () => {
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // const userInfo = {
    //   email: data.email,
    //   password: data.password,
    // };
    // const res = await login(userInfo).unwrap();
    // const user = verifyToken(res.data.accessToken);
    // console.log(user);
    // dispatch(setUser({ user: user, token: res.data.accessToken }));
    console.log(data);
  };

  return (
    <div className="mx-auto flex justify-center items-center mt-16">
      <div className="bg-purple-300  p-6 md:p-8  rounded-lg shadow-xl">
        <CWForm onSubmit={onSubmit}>
          <div>
            <CWInput
              type="name"
              name="name"
              label="Name"
              placeholder="Enter name name"
              rules={{
                required: "Name is required",
              }}
            />
          </div>
          <div>
            <CWInput
              type="email"
              label="Email"
              name="email"
              placeholder="Enter your Email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
            />
          </div>
          <div>
            <CWInput
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />
          </div>
          <div>
            <CWInput
              type="phone"
              name="phone"
              placeholder="Enter your phone number"
              label="Mobile No: "
              rules={{
                required: "Mobile No. is required",
              }}
            />
          </div>
          <div>
            <CWInput
              type="address"
              name="address"
              label="Address"
              placeholder="Enter your present address"
              rules={{
                required: "Address is required",
              }}
            />
          </div>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="button-card my-3" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </CWForm>
        <p className="text-center -mt-6">
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
