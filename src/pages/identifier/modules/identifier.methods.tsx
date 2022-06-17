import { AxiosResponse } from "axios";
import { useState } from "react";
import { IdentifierService } from "service";
import { useRouter } from "next/router";
import { delay } from "helpers/lib";
import { Iidentifier, IidentifierHash } from "./identifier.types";
import { setNextPageView } from "components/lib/common.component";

interface IdentifierMethods {
  loadingIdentifierButton: boolean;
  setLoadingIdentifierButton: (loadingIdentifierButton: boolean) => void;
  error: unknown;
  setError: (error: unknown) => void;
  baseUrl: string;
  submitIdentifier: (data: { identifier: string }) => void;
  identifier: Iidentifier;
  identifierHash: IidentifierHash;
}

const identifierService = new IdentifierService("v1");

const IdentifierMethods = (): IdentifierMethods => {
  const router = useRouter();

  const [loadingIdentifierButton, setLoadingIdentifierButton]: [
    boolean,
    (loadingIdentifierButton: boolean) => void
  ] = useState<boolean>(false);

  const [identifier, setIdentifier]: [
    Iidentifier,
    (identifier: Iidentifier) => void
  ] = useState({});

  const [identifierHash, setIdentifierHash]: [
    IidentifierHash,
    (identifierHash: IidentifierHash) => void
  ] = useState<IidentifierHash>({});

  const [error, setError]: [unknown, (error: unknown) => void] =
    useState<unknown>("");

  const baseUrl: string = "http://localhost:8080";

  const submitIdentifier = async (data: {
    identifier: string;
  }): Promise<void> => {
    setLoadingIdentifierButton(true);
    setIdentifier(data);

    // await identifierService
    //   .postSendOtp(data)
    //   .then(async (respData: AxiosResponse) => {
    //     const { data: response } = respData;
    //     const { user }: { user: IidentifierHash } = response;

    //     setIdentifierHash(user);
    //     await delay(500);
    //     setLoadingIdentifierButton(false);
    //     setNextPageView("verify", user, data.identifier, router);
    //   })
    //   .catch((error) => {
    //     setLoadingIdentifierButton(false);
    //     setError(error);
    //   });

    try {
      const postSendOtpResp: AxiosResponse =
        await identifierService.postSendOtp(data);

      const { data: response } = postSendOtpResp;
      const { user }: { user: IidentifierHash } = response;

      setIdentifierHash(user);
      await delay(500);
      setLoadingIdentifierButton(false);
      setNextPageView("verify", user, data.identifier, router);
    } catch (error) {
      setLoadingIdentifierButton(false);
      setError(error);
    }
  };

  return {
    loadingIdentifierButton,
    setLoadingIdentifierButton,
    identifier,
    error,
    setError,
    baseUrl,
    submitIdentifier,
    identifierHash,
  };
};

export default IdentifierMethods;
