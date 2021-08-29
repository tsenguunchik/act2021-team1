import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { mockImgProduct } from '../../layouts/dashboard/mockImages';

const initialState = {
  pending: false,
  loaded: false,
  error: false,
  mentors: []
};

const slice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {
    startLoading(state) {
      state.pending = true;
      state.loaded = false;
      state.error = false;
    },

    hasError(state, action) {
      state.pending = false;
      state.loaded = false;
      state.error = action.payload;
    },

    clearIndicators(state) {
      state.pending = false;
      state.loaded = false;
      state.error = false;
    },

    getMentorsSuccess(state, action) {
      state.pending = false;
      state.loaded = true;
      state.error = false;
      const result = action.payload.map((mentor, index) => ({
        ...mentor,
        cover: mockImgProduct(index + 1),
        avatarUrl: `/static/mock-images/avatars/mentor_${index + 1}.png`
      }));
      state.mentors = result;
    }
  }
});

export function getMentors() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/mentor');
      dispatch(slice.actions.getMentorsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// Reducer
export default slice.reducer;

// Actions
export const { clearIndicators } = slice.actions;
