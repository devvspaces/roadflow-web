import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { learnNavSlice } from "./learnNavSlice";
import { curriculumsSlice } from "./curriculumThunk";

const makeStore = () =>
  configureStore({
    reducer: combineSlices(authSlice, learnNavSlice, curriculumsSlice),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
