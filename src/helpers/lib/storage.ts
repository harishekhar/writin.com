export {};

export const session = (key?: string, value?: string) => {
  return {
    get: (key: string) => window.sessionStorage.getItem(key),
    set: (key: string, value: string) =>
      window.sessionStorage.setItem(key, value),
    remove: (key: string) => window.sessionStorage.removeItem(key),
    clear: () => window.sessionStorage.clear(),
  };
};

export const local = (key: string, value?: string) => {
  return {
    get: (key: string) => window.localStorage.getItem(key),
    set: (key: string, value: string) =>
      window.localStorage.setItem(key, value),
    remove: (key: string) => window.localStorage.removeItem(key),
    clear: () => window.localStorage.clear(),
  };
};
