import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import { LearnNav } from "@/components/layouts/learn";
import build from "next/dist/build";

// Type for our state
export interface LearnNavState {
  navState: LearnNav[];
  loading: boolean;
  headState: string;
}

// Initial state
const initialState: LearnNavState = {
  navState: [],
  loading: false,
  headState: "",
};

// Actual Slice
export const learnNavSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setNavState(state, action) {
      state.navState = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setHeadState(state, action) {
      state.headState = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        // @ts-ignore: Unreachable code error
        ...action.payload.nav,
      };
    });
  },
});

export const { setNavState, setHeadState, setLoading } = learnNavSlice.actions;

export const selectNavState = (state: AppState) => state.nav.navState;
export const selectHeadState = (state: AppState) => state.nav.headState;
export const selectLoading = (state: AppState) => state.nav.loading;

export default learnNavSlice.reducer;
