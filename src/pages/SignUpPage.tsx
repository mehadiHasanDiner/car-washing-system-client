import { Button, Form } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CWForm from "../components/ui/form/CWForm";
import { SubmitHandler } from "react-hook-form";
import CWInput from "../components/ui/form/CWInput";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { verifyToken } from "../utils/verifyToken";

type Inputs = {
  email: string;
  password: string;
};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await register(data).unwrap();
      if (!res?.success) {
        toast.error("Failed to register.");
      }
      if (res.error) {
        toast.error("Failed to register.");
      }
      if (res.data) {
        const userData = verifyToken(res.data.token);
        dispatch(setUser({ user: userData, token: res.data.token }));
        navigate(location.state?.from ? location.state?.from : "/");
        toast.success("Successfully user registered.");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Failed to register.");
    }
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
