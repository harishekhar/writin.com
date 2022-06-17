import { AxiosResponse } from "axios";
import { setAuthToken } from "components/lib/Common.component";
import { delay } from "helpers/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthService } from "service";
import { IcreateProfile, IcreateProfileMethods } from "./create-profile.types";
import { session } from "helpers/lib/storage";

const authService = new AuthService("v1");

const CreateProfileMethods = (): IcreateProfileMethods => {
  const router = useRouter();
  const [loadingCreateProfileButton, setLoadingCreateProfileButton]: [
    boolean,
    (loadingIdentifierButton: boolean) => void
  ] = useState<boolean>(false);

  const [userId, setUserId]: [string, (userId: string) => void] =
    useState<string>("");

  useEffect(() => {
    const viewData = session().get("viewData");
    const view = session().get("view");
    if (!viewData && !view) {
      return () => {
        router.push("/");
      };
    } else if (view[0] != "create-profile") {
      return () => {
        router.push("/");
      };
    }

    const [encIdentifier] = viewData;
    setUserId(atob(encIdentifier));
  }, [router]);

  const submitCreateProfile = async (data: IcreateProfile) => {
    setLoadingCreateProfileButton(true);
    const viewData = session().get("viewData");
    const [, user] = viewData;
    const { id } = user;
    data.userId = id;

    try {
      const { data: setPasswordResp }: AxiosResponse =
        await authService.postSetPassword(data);

      setAuthToken(setPasswordResp.tokens);
      router.push("/account");
    } catch (error) {
    } finally {
      await delay(1000);
      setLoadingCreateProfileButton(false);
    }
  };
  return {
    loadingCreateProfileButton,
    setLoadingCreateProfileButton,
    submitCreateProfile,
    userId,
  };
};

export default CreateProfileMethods;

// const [loadingIdentifierButton, setLoadingIdentifierButton] = useState(false);
// const baseUrl = "http://localhost:8080";
// const submitIdentifier = () => {
//   IdentifierService(baseUrl).PostSendOtp();
//   setLoadingIdentifierButton(true);
// };
