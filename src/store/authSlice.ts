import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import { USER_KEY, VERIFY_EMAIL_KEY } from "@/common/constants";
import { User } from "@/common/interfaces/user";

export interface AuthState {
  user: User | null;
  verifyEmail: string | null;
}

const loadUser = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

const loadEmail = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(VERIFY_EMAIL_KEY);
  }
  return null;
};

// Initial state
const initialState: AuthState = {
  user: loadUser(),
  verifyEmail: loadEmail(),
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem(USER_KEY, JSON.stringify(action.payload));
    },
    setVerifyEmail(state, action) {
      state.verifyEmail = action.payload;
      localStorage.setItem(VERIFY_EMAIL_KEY, action.payload);
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        // @ts-ignore: Unreachable code error
        ...action.payload.auth,
      };
    });
  },
});

export const { setUser, setVerifyEmail } = authSlice.actions;

export const selectUser = (state: AppState) => state.auth.user;
export const selectVerifyEmail = (state: AppState) => state.auth.verifyEmail;

export default authSlice.reducer;
