import { AxiosResponse } from "axios";
import { session } from "helpers/lib";
import { delay } from "helpers/lib/utils";
import { useRouter } from "next/router";

import { Component, useEffect, useState } from "react";
import { IdentifierService } from "service";

import { IverifyMethods, IverifyOtp } from "./verify.types";
import { setNextPageView, setAuthToken } from "components/lib/Common.component";

const identifierService = new IdentifierService("v1");

const VerifyMethods = (): IverifyMethods => {
  const router = useRouter();
  const [loadingVerifyButton, setLoadingVerifyButton]: [
    boolean,
    (loadingIdentifierButton: boolean) => void
  ] = useState<boolean>(false);

  const [identifier, setIdentifer]: [
    string | undefined,
    (identifier: string) => void
  ] = useState<string>();

  useEffect(() => {
    const viewData = session().get("viewData");
    const view = session().get("view");

    if (viewData && view && view[0] == "verify") {
      const [encIdentifier] = viewData;
      setIdentifer(atob(encIdentifier));
    } else {
      return () => {
        debugger;
        router.push("/");
      };
    }
  }, [router]);

  const submitVerify = async (data: IverifyOtp) => {
    setLoadingVerifyButton(true);
    const viewData = session().get("viewData");
    const [, user] = viewData;
    const { identifier: identifierHash } = user;
    data.identifier = identifierHash;
    try {
      const postVerifyResp: AxiosResponse =
        await identifierService.postVerifyOtp(data);

      const { data: response } = postVerifyResp;
      const { user: postVerifyData, tokens } = response;
      const identifier = postVerifyData.email || postVerifyData.phoneNumber;
      if (tokens) {
        setAuthToken(tokens);
        router.push("/account");
      } else {
        setNextPageView("create-profile", postVerifyData, identifier, router);
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
    identifier,
    submitVerify,
  };
};

export default VerifyMethods;
