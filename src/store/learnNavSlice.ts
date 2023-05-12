import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import { LearnNav } from "@/components/layouts/learn";
import build from "next/dist/build";

// Type for our state
export interface LearnNavState {
  navState: LearnNav[];
  headState: string;
}

// Initial state
const initialState: LearnNavState = {
  navState: [],
  headState: ""
};

// Actual Slice
export const learnNavSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    // Action to set the nav list
    setNavState(state, action) {
      state.navState = action.payload;
    },
    // Action to set the nav heading
    setHeadState(state, action) {
      state.headState = action.payload;
    },

    
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.nav,
      };
    });
  },
  
});

export const { setNavState, setHeadState } = learnNavSlice.actions;

export const selectNavState = (state: AppState) => state.nav.navState;
export const selectHeadState = (state: AppState) => state.nav.headState;

export default learnNavSlice.reducer;
