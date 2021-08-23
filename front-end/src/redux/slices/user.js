import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  pending: false,
  loaded: false,
  error: false,
  myProfile: null
};

const slice = createSlice({
  name: 'user',
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

    getProfileSuccess(state, action) {
      state.pending = false;
      state.loaded = true;
      state.error = false;
      state.myProfile = action.payload;
    },

    getLogout(state) {
      state.pending = false;
      state.loaded = true;
      state.error = false;
      state.myProfile = null;
    }
  }
});

export function getProfile(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/signup/register', {
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName
      });
      dispatch(slice.actions.getProfileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// Reducer
export default slice.reducer;

// Actions
export const { getProfileSuccess, getLogout, clearIndicators } = slice.actions;
