import { AxiosResponse } from "axios";
import { useState } from "react";
import { IdentifierService } from "service";

interface submitOtp {
  identifier: string;
  otp: string;
}

interface Iidentifier {
  identifier?: string;
}

interface IidentifierHash {
  identifier?: string;
  otp?: string;
  id?: string;
  isVerified?: boolean;
}

interface IdentifierMethods {
  loadingIdentifierButton: boolean;
  setLoadingIdentifierButton: (loadingIdentifierButton: boolean) => void;

  pageView: string;
  setPageView: (pageView: string) => void;

  error: string;
  setError: (error: string) => void;

  baseUrl: string;
  submitIdentifier: (data: { identifier: string }) => void;
  identifier: Iidentifier;
  loadingOtpButton: boolean;
  setLoadingOtpButton: (loadingOtpButton: boolean) => void;
  submitOtp: (data: submitOtp) => void;
  identifierHash: IidentifierHash;
}

const identifierService = new IdentifierService("v1");

const IdentifierMethods = (): IdentifierMethods => {
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

  const [pageView, setPageView]: [string, (pageView: string) => void] =
    useState<string>("identifier");

  const [loadingOtpButton, setLoadingOtpButton] = useState(false);

  const [error, setError]: [string, (error: string) => void] =
    useState<string>("");

  const baseUrl: string = "http://localhost:8080";

  const delay = (duration: number) =>
    new Promise((resolve) => setTimeout(resolve, duration));

  const submitIdentifier = async (data: {
    identifier: string;
  }): Promise<void> => {
    setLoadingIdentifierButton(true);
    setIdentifier(data);

    await identifierService
      .postSendOtp(data)
      .then(async (data: AxiosResponse) => {
        const { data: response } = data;
        const { user } = response;

        setIdentifierHash(user);
        // await delay(500);
        setLoadingIdentifierButton(false);
        setPageView("verifyOtp");
      })
      .catch((error) => {
        setLoadingIdentifierButton(false);
        setError(error);
      });
  };

  const submitOtp = (data: submitOtp): void => {
    data.identifier = identifierHash.identifier || "";

    setLoadingOtpButton(true);
    identifierService
      .postVerifyOtp(data)
      .then((data) => {
        setTimeout(() => {
          setPageView("identifier");
          setLoadingOtpButton(false);
          setIdentifierHash({});
          setIdentifier({});
        }, 200);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoadingOtpButton(false);
      });
  };

  return {
    loadingIdentifierButton,
    setLoadingIdentifierButton,
    pageView,
    setPageView,
    identifier,
    error,
    setError,
    baseUrl,
    submitIdentifier,
    setLoadingOtpButton,
    loadingOtpButton,
    submitOtp,
    identifierHash,
  };
};

export { IdentifierMethods };

// const [loadingIdentifierButton, setLoadingIdentifierButton] = useState(false);
// const baseUrl = "http://localhost:8080";
// const submitIdentifier = () => {
//   IdentifierService(baseUrl).PostSendOtp();
//   setLoadingIdentifierButton(true);
// };
