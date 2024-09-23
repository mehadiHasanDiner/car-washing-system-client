import React from "react";
import { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Button } from "antd";
import CWForm from "../components/ui/form/CWForm";
import CWInput from "../components/ui/form/CWInput";
import { toast } from "sonner";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  // console.log(err?.data?.message);

  const navigate = useNavigate();

  const defaultValues = {
    // email: "mehadi@gmail.com",
    // password: "123456",
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const { data, error: err } = await login(userInfo);
      console.log(data.data);
      const error: any = err;
      if (error) {
        if (error?.data?.message === "User Not Found") {
          return toast.error("Invalid email address", {
            description: "Enter a valid email address.",
          });
        }
        if (error?.status === 500) {
          // console.log("first")
          return toast("password did not match");
        }

        return toast.error(error?.data?.message || "Unknown error occurs");
      }
      const user: any = verifyToken(data?.data?.token);

      dispatch(setUser({ user: user, token: data?.data?.token }));
      navigate(`/dashboard-${user?.role}`);
      toast.success("User successfully logged in!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto flex justify-center items-center mt-12 h-[calc(100vh-384px)]">
      <div className="bg-purple-300  p-6 md:px-8 py-12  rounded-lg shadow-xl">
        <CWForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <div>
            <CWInput
              type="email"
              label="Email"
              name="email"
              placeholder="enter your email address"
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
              label="Password "
              placeholder="enter your password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />
          </div>

          <Button className="button-card my-3" htmlType="submit">
            Submit
          </Button>
        </CWForm>

        <p className="text-center">
          New to Car-expert? Please{" "}
          <Link
            className="text-purple-800 font-semibold hover:font-bold"
            to="/sign-up"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
