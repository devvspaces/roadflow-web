import Cookies from "js-cookie";
import { PAYLOAD_KEY, USER_KEY } from "../common/constants";
import { LoginResponse } from "../common/interfaces/login";
import { JwtPayload } from "@/common/interfaces/token";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export const authenticate = (data: LoginResponse) => {
  Cookies.set(PAYLOAD_KEY, JSON.stringify({
    ...data.tokens,
    access_expires_at: Date.now() + data.tokens.access_expires_at * 1000,
    refresh_expires_at: Date.now() + data.tokens.refresh_expires_at * 1000
  }));
  Cookies.set(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

export const getAccessToken = () => {
  const jwt_payload = Cookies.get(PAYLOAD_KEY);
  let jwt_payload_decoded: JwtPayload;

  function clear() {
    Cookies.remove(PAYLOAD_KEY);
    Cookies.remove(USER_KEY);
  }

  if (!jwt_payload || jwt_payload == undefined) {
    return
  }

  try {
    jwt_payload_decoded = JSON.parse(jwt_payload);
  } catch (e) {
    clear()
    return
  }

  if (jwt_payload_decoded.access_expires_at < Date.now()) {
    clear()
    return
  }

  return jwt_payload_decoded.access;
}

export const getAccessTokenServerSide = (req: IncomingMessage & {
  cookies: NextApiRequestCookies
}) => {
  const jwt_payload = req.cookies[PAYLOAD_KEY];
  let jwt_payload_decoded: JwtPayload;

  if (!jwt_payload || jwt_payload == undefined) {
    return
  }

  try {
    jwt_payload_decoded = JSON.parse(jwt_payload);
  } catch (e) {
    return
  }

  if (jwt_payload_decoded.access_expires_at < Date.now()) {
    return
  }

  return jwt_payload_decoded.access;
}
