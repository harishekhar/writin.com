import { AxiosResponse } from "axios";
import { delay } from "helpers/lib/utils";
import { useRouter } from "next/router";

import { useState } from "react";
import { IdentifierService } from "service";

import { IverifyMethods, IverifyOtp } from "./verify.types";

const identifierService = new IdentifierService("v1");

const VerifyMethods = (): IverifyMethods => {
  const router = useRouter();
  const [loadingVerifyButton, setLoadingVerifyButton]: [
    boolean,
    (loadingIdentifierButton: boolean) => void
  ] = useState<boolean>(false);

  const submitVerify = async (data: IverifyOtp) => {
    setLoadingVerifyButton(true);

    try {
      const { data: postVerifyResp }: AxiosResponse =
        await identifierService.postVerifyOtp(data);
      if (postVerifyResp.tokens) {
        router.push("/account");
      }
    } catch (error) {
    } finally {
      await delay(1000);
      setLoadingVerifyButton(false);
    }
  };
  return {
    loadingVerifyButton,
    setLoadingVerifyButton,
    submitVerify,
  };
};

export default VerifyMethods;

// const [loadingIdentifierButton, setLoadingIdentifierButton] = useState(false);
// const baseUrl = "http://localhost:8080";
// const submitIdentifier = () => {
//   IdentifierService(baseUrl).PostSendOtp();
//   setLoadingIdentifierButton(true);
// };
