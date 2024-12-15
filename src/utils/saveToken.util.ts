import Cookies from "js-cookie";
export const saveToken = (payload: string, key:string) => {
  Cookies.set(payload, key);
};
