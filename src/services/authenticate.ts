import Cookies from "js-cookie";
import { PAYLOAD_KEY, USER_KEY } from "../common/constants";
import { LoginResponse } from "../common/interfaces/login";

export const authenticate = (data: LoginResponse) => {
  Cookies.set(PAYLOAD_KEY, JSON.stringify({
    ...data.tokens,
    access_expires_at: Date.now() + data.tokens.access_expires_at * 1000,
    refresh_expires_at: Date.now() + data.tokens.refresh_expires_at * 1000
  }));
  Cookies.set(USER_KEY, JSON.stringify(data.user));
  return data.user;
}
