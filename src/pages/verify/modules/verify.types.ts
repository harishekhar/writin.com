import { IverifyOtp } from "service/Identifier/types";

export interface IverifyMethods {
  loadingVerifyButton: boolean;
  setLoadingVerifyButton: (loadingVerifyButton: boolean) => void;
  submitVerify: (data: IverifyOtp) => void;
}

export type { IverifyOtp };
