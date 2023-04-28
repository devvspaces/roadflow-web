import Cookies from "js-cookie";
import { PAYLOAD_KEY, USER_KEY } from "../constants";

export const useLogout = () => {
  const logout = async () => {
    Cookies.remove(PAYLOAD_KEY);
    Cookies.remove(USER_KEY);
  }

  return { logout }
}
