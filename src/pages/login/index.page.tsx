import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./login.module.scss";
import { Icon, IconType } from "components/Icon/Icon.component";

import { Link, Button, TextField, HorizontalLine } from "components";
import { LoginMethods } from "./modules";
import { SubmitHandler, useForm } from "react-hook-form";
import { Ilogin } from "./modules/login.types";
import Identifier from "pages/identifier/index.page";

const Login: NextPage = () => {
  const { loadingLoginButton, setLoadingLoginButton, submitLogin } =
    LoginMethods();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ilogin>({
    mode: "onSubmit",
  });

  const onSubmitLogin: SubmitHandler<Ilogin> = (data) => {
    submitLogin(data);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex">
        {/* First half  */}
        <div className="hidden sm:hidden md:hidden lg:flex w-full lg:w-3/5 justify-around items-center bg-cover bg-[url('https://images.unsplash.com/photo-1650825556125-060e52d40bd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]"></div>
        {/* Second Half  */}
        <div className="flex w-full lg:w-2/5 flex-col">
          <div className="flex justify-center flex-grow items-center bg-white space-y-8 font-sans">
            <div className="w-full px-5 sm:px-20 md:px-16 lg:px-8 xl:px-10">
              <div className="flex  w-full p-5 flex-col ">
                <div className="flex justify-center identifier__icon w-full ">
                  <Image
                    src="/vercel.svg"
                    alt="icon"
                    width={74}
                    height={74}
                    className="identifier__icon--src"
                  />
                </div>
                <div className="flex text-base identifier__info justify-center font-normal text-gray-600 mt-7 mb-6">
                  Sign in with your data that you entered during your
                  registration.
                </div>
              </div>

              <form
                className="bg-white rounded-md"
                onSubmit={handleSubmit(onSubmitLogin)}
              >
                <div className="flex items-center mb-8 w-full">
                  <TextField
                    id="identifier"
                    type="text"
                    placeholder="Enter your mobile number (10 digits) or email ID"
                    label="Enter your mobile number (10 digits) or email ID"
                    {...register("identifier")}
                  />
                </div>
                <div className="flex items-center mb-8 w-full">
                  <TextField
                    id="password"
                    type="password"
                    placeholder="min. 8 characters"
                    label="Password"
                    {...register("password")}
                  />
                </div>

                <Button
                  type="submit"
                  isFullWidth={true}
                  state="primary"
                  classNames="py-3"
                  isLoading={loadingLoginButton}
                >
                  Login
                </Button>
                <div className="identifier__info text-xs font-normal leading-5 mt-2 text-neutral">
                  By proceeding, you agree to our
                  <Link href="/"> Terms of Services </Link> and
                  <Link href="/"> Privacy Policy </Link>
                </div>
              </form>
              <HorizontalLine className="mt-3 leading-5" centerText="OR" />
              <div className="flex mt-3">
                <Button
                  typeOf="google"
                  isFullWidth={true}
                  state="light"
                  classNames="py-3 mr-2 text-base"
                  iconSize="large"
                  iconType="GOOGLE"
                >
                  Login with Google
                </Button>
                <Button
                  typeOf="linkedin"
                  state="light"
                  isFullWidth={true}
                  classNames="py-3 ml-2 bg-white text-base"
                  iconSize="large"
                  iconType="LINKEDIN"
                >
                  Login with LinkedIn
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-center flex-grow-0 mb-10 text-sm identifier__info font-normal leading-5 mt-2 text-neutral">
            <div className="flex justify-center flex-col">
              <div className="flex justify-center mb-10">
                <Link href="/forgot-password" className="font-bold">
                  {" "}
                  Forgot password?{" "}
                </Link>
              </div>

              <div className="flex">
                Don&apos;t have an account? &nbsp;{" "}
                <Link href="/sign-up" className="font-bold">
                  {" "}
                  Sign up{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
