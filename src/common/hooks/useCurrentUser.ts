import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/authSlice";

export const useCurrentUser = () => {
  const user = useAppSelector(selectUser);
  return user;
};
