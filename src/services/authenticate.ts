import { PAYLOAD_KEY, USER_KEY } from "../common/constants";
import { LoginResponse } from "../common/interfaces/login";
import { JwtPayload } from "@/common/interfaces/token";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export const authenticate = (data: LoginResponse) => {
  localStorage.setItem(
    PAYLOAD_KEY,
    JSON.stringify(processJWTPayload(data.tokens))
  );
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
};

export const processJWTPayload = (payload: JwtPayload) => {
  return {
    ...payload,
    access_expires_at: Date.now() + payload.access_expires_at * 1000,
    refresh_expires_at: Date.now() + payload.refresh_expires_at * 1000,
  };
};

export const getAccessToken = () => {
  const jwt_payload = localStorage.getItem(PAYLOAD_KEY);
  let jwt_payload_decoded: JwtPayload;

  function clear() {
    localStorage.removeItem(PAYLOAD_KEY);
    localStorage.removeItem(USER_KEY);
  }

  if (!jwt_payload || jwt_payload == undefined) {
    return;
  }

  try {
    jwt_payload_decoded = JSON.parse(jwt_payload);
  } catch (e) {
    return clear();
  }

  return {
    ...jwt_payload_decoded,
    updatePayload: (payload: JwtPayload) => {
      localStorage.setItem(
        PAYLOAD_KEY,
        JSON.stringify(processJWTPayload(payload))
      );
    },
    clear,
  };
};

export const getAccessTokenServerSide = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
) => {
  const jwt_payload = req.cookies[PAYLOAD_KEY];
  let jwt_payload_decoded: JwtPayload;

  if (!jwt_payload || jwt_payload == undefined) {
    return;
  }

  try {
    jwt_payload_decoded = JSON.parse(jwt_payload);
  } catch (e) {
    return;
  }
  return {
    ...jwt_payload_decoded,
    updatePayload: (payload: JwtPayload) => {
      req.cookies[PAYLOAD_KEY] = JSON.stringify(processJWTPayload(payload));
    },
  };
};

export const checkServerSideResponse: any = (
  response: { success: boolean; status: number },
  req: IncomingMessage
) => {
  if (!response.success) {
    if (response.status === 401) {
      return {
        redirect: {
          destination: req.url,
        },
      };
    }
    return {
      notFound: true,
    };
  }
};
