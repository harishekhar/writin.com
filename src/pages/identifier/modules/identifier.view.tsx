import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { useForm, SubmitHandler } from "react-hook-form";

import { Link, Button, TextField, HorizontalLine } from "components";
import { IdentifierMethods } from "./";
import validator from "validator";

import { useEffect } from "react";
export type SentOtpProps = {
  identifier: any;
};

interface IIdentifierView {
  updatePageView: (pageView: string) => void;
}

type Inputs = {
  identifier: string;
};

export const IdentifierView: NextPage<IIdentifierView> = ({
  updatePageView,
  ...props
}) => {
  const {
    loadingIdentifierButton,
    submitIdentifier,
    setPageView,
    pageView,
    identifier,
  } = IdentifierMethods();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      identifier: "sendotp.1652106496@gmail.com",
    },
  });

  console.log(watch("identifier"));

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    submitIdentifier(data);
  };

  useEffect(() => {
    updatePageView(pageView);
  });

  console.log(pageView);

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
              Sign in with your data that you entered during your registration.
            </div>
            {pageView}
          </div>

          <form
            className="bg-white rounded-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center mb-8 w-full">
              <TextField
                type="text"
                placeholder="Enter your mobile number (10 digits) or email ID"
                label="Enter your mobile number (10 digits) or email ID"
                {...register("identifier")}
              />
            </div>

            <Button
              type="submit"
              isFullWidth={true}
              state="primary"
              classNames="py-3"
              isLoading={loadingIdentifierButton}
            >
              Next
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
              isLoading={false}
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
        Don&apos;t have an account? &nbsp;{" "}
        <Link href="/sign-up" className="font-bold">
          {" "}
          Sign up{" "}
        </Link>
      </div>
    </div>
  );
};
