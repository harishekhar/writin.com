import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./login.module.scss";
import { Link, Button, TextField, HorizontalLine } from "components";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex">
        {/* First half  */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-around items-center bg-cover bg-[url('https://images.unsplash.com/photo-1650825556125-060e52d40bd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]"></div>
        {/* Second Half  */}
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8 font-sans">
          <div className="w-full px-44 md:px-44 lg:px-32">
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
              <div className="flex text-sm identifier__info justify-center font-normal text-gray-600 mt-7 mb-6">
                Sign in with your data that you entered during your
                registration.
              </div>
            </div>

            <form className="bg-white rounded-md">
              <div className="flex items-center mb-8 w-full">
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your mobile number (10 digits) or email ID"
                />
              </div>

              <Button
                type="submit"
                isFullWidth={true}
                state="primary"
                classNames="py-3"
              >
                Login
              </Button>
              <div className="flex identifier__info text-xs font-normal mt-2 text-neutral">
                By proceeding, you agree to our &nbsp;
                <Link href="/"> Terms of Services </Link> &nbsp; and &nbsp;
                <Link href="/"> Privacy Policy </Link>
              </div>
            </form>
            <HorizontalLine centerText="OR" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
