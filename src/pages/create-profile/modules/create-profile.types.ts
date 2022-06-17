import { Ilogin, IcreateProfile } from "service/Auth/types";

export interface IcreateProfileMethods {
  loadingCreateProfileButton: boolean;
  setLoadingCreateProfileButton: (loadingSignUpButton: boolean) => void;
  submitCreateProfile: (data: IcreateProfile) => void;
  userId: string;
}

export type { Ilogin, IcreateProfile };
