import { local, session } from "helpers/lib";
import dayjs from "dayjs";

import { routerConfig } from "helpers/lib";
import { IidentifierHash } from "./types";

export const setNextPageView = (
  view: string,
  data: any,
  identifier: string,
  router?: any
) => {
  const validUntil = dayjs().add(5, "minute");
  const storageObj: [string, dayjs.Dayjs] = [
    routerConfig[view].name,
    validUntil,
  ];

  const encIdentifier = btoa(identifier);
  const viewData: [string, IidentifierHash] = [encIdentifier, data];

  session().set("view", storageObj);
  session().set("viewData", viewData);
  router.push(routerConfig[view].name);
};

export const setAuthToken = (tokens: any) => {
  const { access, refresh } = tokens;
  local().set("authToken", access);
  local().set("refreshToken", refresh);
};
