import faker from 'faker';
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { mockImgProduct } from '../../layouts/dashboard/mockImages';

const initialState = {
  pending: false,
  loaded: false,
  error: false,
  essays: [],
  currentEssay: null
};

const slice = createSlice({
  name: 'essay',
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

    getEssaysSuccess(state, action) {
      state.pending = false;
      state.error = false;
      const result = action.payload.map((essay, index) => ({
        ...essay,
        cover: mockImgProduct(index + 1),
        author: {
          name: faker.name.findName(),
          avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`
        }
      }));
      state.essays = result;
    },

    getCreateSuccess(state, action) {
      state.pending = false;
      state.loaded = true;
      state.error = false;
      const temp = state.essays;

      const result = {
        ...action.payload,
        cover: mockImgProduct(1),
        author: {
          name: faker.name.findName(),
          avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`
        }
      };
      temp.unshift(result);
      state.essays = temp;
    },

    getCurrentEssaySuccess(state, action) {
      state.pending = false;
      state.error = false;
      const result = {
        ...action.payload.essay,
        log: action.payload.log,
        cover: mockImgProduct(1),
        otherEssays: action.payload.other_essays.map((essay, index) => ({
          ...essay,
          cover: mockImgProduct(index + 1),
          author: {
            name: faker.name.findName(),
            avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`
          }
        })),
        author: {
          name: action.payload.user,
          avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`
        }
      };
      state.currentEssay = result;
    },

    getCurrentEssayLogSuccess(state, action) {
      state.pending = false;
      state.loaded = true;
      state.error = false;
      const result = {
        ...state.currentEssay,
        log: action.payload.log
      };
      state.currentEssay = result;
    },

    getDoneEssayLogSuccess(state, action) {
      state.pending = false;
      state.loaded = true;
      state.error = false;
      const result = {
        ...state.currentEssay.essay,
        log: action.payload.log
      };
      state.currentEssay = result;
    },

    clearCurrentEssay(state) {
      state.pending = false;
      state.loaded = false;
      state.error = false;
      state.currentEssay = null;
    }
  }
});

export function getEssays() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/essay');
      dispatch(slice.actions.getEssaysSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCurrentEssay(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/essay/${id}`);
      dispatch(slice.actions.getCurrentEssaySuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function submitEssay(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/essay/create', data);
      dispatch(slice.actions.getCreateSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function changeReviewStatus(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/essay/${id}`);
      dispatch(slice.actions.getCurrentEssayLogSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function changeDoneStatus(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/essay/done/${id}`);
      dispatch(slice.actions.getCurrentEssayLogSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// Reducer
export default slice.reducer;

// Actions
export const { clearIndicators, clearCurrentEssay } = slice.actions;
