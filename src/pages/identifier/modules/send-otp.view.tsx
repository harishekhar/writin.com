import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./login.module.scss";
import { Icon, IconType } from "components/Icon/Icon.component";

import { useForm, SubmitHandler } from "react-hook-form";

import { Link, Button, TextField, HorizontalLine } from "components";
import { IdentifierMethods } from "./identifier.methods";
import validator from "validator";
import { useEffect } from "react";
export type SentOtpProps = {
  identifier: any;
};

export const SendOtpView: NextPage<SentOtpProps> = ({ ...props }) => {
  const {
    loadingIdentifierButton,
    setLoadingIdentifierButton,
    pageView,
    setPageView,
    error,
    setError,
    baseUrl,
    submitIdentifier,
  } = IdentifierMethods();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch("otp"));

  useEffect(() => {
    setPageView(pageView);
  });

  type Inputs = {
    identifier: string;
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    submitIdentifier(data);
  };

  const { identifier }: any = { ...props.identifier };
  const type = validator.isEmail(identifier) ? "email" : "phone number";

  return (
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
            <div className="flex text-sm identifier__info justify-center font-normal text-gray-600 mt-7 mb-6">
              Enter your OTP, received on your {type}
            </div>
            {pageView}
          </div>

          <form className="bg-white rounded-md">
            <div className="flex items-center mb-8 w-full">
              <TextField
                id="identifier"
                type="password"
                name="otp"
                placeholder=""
                {...register}
                label={[
                  "Verify your ",
                  `${type}`,
                  <b key="first"> {identifier}</b>,
                ]}
              />
            </div>

            <Button
              type="submit"
              isFullWidth={true}
              state="primary"
              classNames="py-3"
              isLoading={loadingIdentifierButton}
            >
              Submit
            </Button>
            <div className="identifier__info text-xs font-normal leading-5 mt-2 text-neutral">
              By proceeding, you agree to our
              <Link href="/"> Terms of Services </Link> and
              <Link href="/"> Privacy Policy </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="flex items-end justify-center flex-grow-0 mb-10 text-sm identifier__info font-normal leading-5 mt-2 text-neutral">
        Login with password? &nbsp;{" "}
        <Link href="/login" className="font-bold">
          {" "}
          Login{" "}
        </Link>
      </div>
    </div>
  );
};
