import {
  CurriculumPageResponse,
  EnrolledCurriculumPageResponse,
  EnrolledCurriculumsResponse,
} from "@/common/interfaces/curriculum";
import { PaginatedResponse } from "@/common/interfaces/response";
import { api } from "@/services/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface CurriculumState {
  enrolled: PaginatedResponse<EnrolledCurriculumsResponse> | null;
  fetchingEnrolled: boolean;
  detail: CurriculumPageResponse | null;
  fetchingDetail: boolean;
  enrolledCurriculum: EnrolledCurriculumPageResponse | null;
  fetchingEnrolledCurriculum: boolean;
}

const initialState: CurriculumState = {
  enrolled: null,
  fetchingEnrolled: false,
  detail: null,
  fetchingDetail: false,
  enrolledCurriculum: null,
  fetchingEnrolledCurriculum: false,
};

export const fetchEnrolled = createAsyncThunk(
  "curriculums/fetchEnrolled",
  async (_, { rejectWithValue }) => {
    const response = await api.get_enrolled_curriculums();
    if (response.success) {
      return response.result.data;
    }
    return rejectWithValue(response.result);
  }
);

export const fetchDetail = createAsyncThunk(
  "curriculums/fetchDetail",
  async (slug, { rejectWithValue }) => {
    const response = await api.get_single_curriculum(slug as any);
    if (response.success && response.result.data) {
      return response.result.data;
    }
    return rejectWithValue(response.result);
  }
);

export const fetchEnrolledCurriculum = createAsyncThunk(
  "curriculums/fetchEnrolledCurriculum",
  async (slug, { rejectWithValue }) => {
    const response = await api.get_single_enrolled_curriculum(slug as any);
    if (response.success && response.result.data) {
      return response.result.data;
    }
    return rejectWithValue(response.result);
  }
);

export const curriculumsSlice = createSlice({
  name: "curriculums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolled.pending, (state, action) => {
        state.fetchingEnrolled = true;
      })
      .addCase(fetchEnrolled.fulfilled, (state, action) => {
        if (action.payload) {
          state.enrolled = action.payload;
        }
        state.fetchingEnrolled = false;
      })
      .addCase(fetchDetail.pending, (state, action) => {
        state.fetchingDetail = true;
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.fetchingDetail = false;
      })
      .addCase(fetchEnrolledCurriculum.pending, (state, action) => {
        state.fetchingEnrolledCurriculum = true;
      })
      .addCase(fetchEnrolledCurriculum.fulfilled, (state, action) => {
        state.enrolledCurriculum = action.payload;
        state.fetchingEnrolledCurriculum = false;
      });
  },
});

export const curriculumsActions = curriculumsSlice.actions;
export const selectCurriculumDetail = (state: AppState) =>
  state.curriculums.detail;
export const selectFetchingDetail = (state: AppState) =>
  state.curriculums.fetchingDetail;
export const selectEnrolledCurriculum = (state: AppState) =>
  state.curriculums.enrolledCurriculum;
export const selectFetchingEnrolledCurriculum = (state: AppState) =>
  state.curriculums.fetchingEnrolledCurriculum;
