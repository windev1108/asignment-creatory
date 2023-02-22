import { GetServerSidePropsContext } from "next";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { ImPointDown } from "react-icons/im";
import axios from "axios";
import { Data } from "./api/auth";
import { getCookie } from "cookies-next";
import { isValidName } from "@/utils/constants";
import { isValidPassword } from "@/utils/constants";
import { isValidPhone } from "@/utils/constants";
import Layout from "@/components/Layout";

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const username = getCookie("username", { req, res });

  if (username) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};

const SignIn = () => {
  const router = useRouter();
  const [form, setForm] = useState<{
    name: string;
    email: string;
    username: string;
    password: string;
    phone: string;
    isShowLogin: boolean;
    isShowPassword: boolean;
  }>({
    name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    isShowLogin: true,
    isShowPassword: false,
  });
  const {
    name,
    email,
    username,
    password,
    phone,
    isShowPassword,
    isShowLogin,
  } = form;

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!isValidName(name)) {
        toast.error(
          "Name should have at least 2 characters and no more than 1000"
        );
        return;
      }

      if (!isValidPassword(password)) {
        toast.error(
          "Password, should have at least a number, a special character, and be more than 8 characters long"
        );
        return;
      }

      if (!isValidPhone(phone)) {
        toast.error("A invalid vietnamese phone number");
        return;
      }

      toast.success("Create user success");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!username) {
        toast.error("Please enter your username");
        return;
      }
      if (!password) {
        toast.error("Please enter your password");
        return;
      }
      const {
        data: { auth, errorDetails },
      }: { data: Data } = await axios.post("/api/auth", {
        username,
        password,
      });
      if (auth) {
        toast.success("Login success!");
        router.reload();
      } else {
        toast.error(errorDetails as string);
      }
    } catch (error: any) {
      toast.error("Wrong password/username");
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100  min-h-screen flex items-center justify-center">
        <div
          className={`${
            !isShowLogin ? "right-panel-active" : ""
          } container border w-[50vw]`}
          id="container"
        >
          <div className="form-container register-container">
            <form
              onSubmit={handleSignUp}
              className="flex bg-white items-center justify-center flex-col py-0 px-[50px] h-full text-center"
            >
              <h1 className="text-2xl font-[700] leading-[-1.5px] m0 mb-[15px]">
                Register
              </h1>
              <input
                value={name}
                onChange={({ target }) =>
                  setForm({ ...form, name: target.value })
                }
                className="outline-none bg-[#eee] rounded-[10px] border-none py-[12px] px-[15px] my-[6px] mx-0 w-full"
                type="text"
                autoComplete="off"
                placeholder="Name"
              />
              <input
                value={email}
                onChange={({ target }) =>
                  setForm({ ...form, email: target.value })
                }
                className="outline-none bg-[#eee] rounded-[10px] border-none py-[12px] px-[15px] my-[6px] mx-0 w-full"
                type="email"
                autoComplete="off"
                placeholder="Email"
              />
              <div className="flex rounded-[10px] bg-[#eee] items-center w-full my-[6px]">
                <input
                  value={password}
                  onChange={({ target }) =>
                    setForm({ ...form, password: target.value })
                  }
                  className="flex-1 outline-none bg-transparent rounded-[10px] border-none py-[12px] px-[15px] mx-0 w-full"
                  type={isShowPassword ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Password"
                />

                <button
                  onClick={() =>
                    setForm({ ...form, isShowPassword: !isShowPassword })
                  }
                  type="button"
                  className="p-1 hover:bg-gray-100 rounded-full active:scale-105 mr-2"
                >
                  {isShowPassword ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </button>
              </div>

              <input
                value={phone!}
                onChange={({ target }) =>
                  setForm({ ...form, phone: target.value })
                }
                className="outline-none bg-[#eee] rounded-[10px] border-none py-[12px] px-[15px] my-[6px] mx-0 w-full"
                type="text"
                autoComplete="off"
                placeholder="Phone"
              />
              <button
                type="submit"
                className="relative rounded-[20px] border-[1px] border-[#4bb6b7] bg-[#4bb6b7] text-white text-[15px] font-[700] m-[10px] py-[12px] px-[80px] tracking-[1px] capitalize transition-all duration-[.3s] ease-in-out hover:tracking-[3px] active:scale-[.95] focus:outline-none"
              >
                Register
              </button>
            </form>
          </div>

          <div className="form-container login-container">
            <form
              onSubmit={handleSignIn}
              className="flex bg-white items-center justify-center flex-col py-0 px-[50px] h-full text-center"
            >
              <h1 className="text-2xl font-[700] leading-[-1.5px] m0 mb-[15px]">
                Login
              </h1>
              <input
                value={username}
                onChange={({ target }) =>
                  setForm({ ...form, username: target.value })
                }
                className="outline-none bg-[#eee] rounded-[10px] border-none py-[12px] px-[15px] my-[6px] mx-0 w-full"
                type="username"
                placeholder="Username"
              />
              <div className="flex rounded-[10px] bg-[#eee] items-center w-full">
                <input
                  value={password}
                  onChange={({ target }) =>
                    setForm({ ...form, password: target.value })
                  }
                  className="flex-1 outline-none bg-transparent rounded-[10px] border-none py-[12px] px-[15px] mx-0 w-full"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  onClick={() =>
                    setForm({ ...form, isShowPassword: !isShowPassword })
                  }
                  type="button"
                  className="p-1 hover:bg-gray-100 rounded-full active:scale-105 mr-2"
                >
                  {isShowPassword ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </button>
              </div>

              <button className="relative rounded-[20px] border-[1px] border-[#4bb6b7] bg-[#4bb6b7] text-white text-[15px] font-[700] hover:scale-x-110 m-[10px] py-[12px] px-[80px] tracking-[1px] capitalize transition-all duration-[.3s] ease-in-out hover:tracking-[1px] active:scale-[.95] focus:outline-none">
                Login
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay relative">
              <div className="overlay-panel overlay-left">
                <h1 className="text-[45px] leading-[45px] font-[700] m-0 mb-[15px]">
                  Hi Creatory
                </h1>
                <p>
                  If you don't have an account, log in here{" "}
                  <ImPointDown className="inline text-white" />
                </p>
                <button
                  onClick={() =>
                    setForm({
                      ...form,
                      isShowLogin: true,
                      username: "",
                      name: "",
                      password: "",
                    })
                  }
                  id="login"
                  className="group border-2 border-white  relative rounded-[20px] text-white text-[15px] font-[700] m-[10px] py-[12px] px-[80px] tracking-[1px] capitalize transition-all duration-[.3s] ease-in-out hover:tracking-[3px] active:scale-[.95] focus:outline-none"
                >
                  Login
                  <HiOutlineArrowNarrowRight className="group-hover:opacity-100 group-hover:right-[20%] top-[35%] right-[50%]  absolute opacity-0 transition-all duration-[.3s] ease-in-out" />
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="text-[45px] leading-[45px] font-[700] m-0 mb-[15px]">
                  Hi Creatory
                </h1>
                <p className="text-[14px] font-[100px] leading-[20px] tracking-[.5px] mt-[20px] mx-0 mb-[30px]">
                  If you don't have an account, register here{" "}
                  <ImPointDown className="inline text-white" />
                </p>
                <button
                  onClick={() =>
                    setForm({
                      ...form,
                      isShowLogin: false,
                      username: "",
                      name: "",
                      password: "",
                    })
                  }
                  className="group border-2 border-white  relative rounded-[20px] text-white text-[15px] hover:scale-x-110 font-[700] m-[10px] py-[12px] px-[80px] tracking-[1px] capitalize transition-all duration-[.3s] ease-in-out hover:tracking-[3px] active:scale-[.95] focus:outline-none"
                  id="register"
                >
                  Register
                  <HiOutlineArrowNarrowLeft className="group-hover:opacity-100 group-hover:left-[20%] top-[35%] left-[50%]  absolute opacity-0 transition-all duration-[.3s] ease-in-out" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
