import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  pending: false,
  loaded: false,
  error: false,
  myProfile: null,
  resendSuccess: false
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
      state.resendSuccess = false;
    },

    clearIndicators(state) {
      state.pending = false;
      state.loaded = false;
      state.error = false;
      state.resendSuccess = false;
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
    },

    getResendSuccess(state) {
      state.resendSuccess = true;
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

export function getConfirm(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/signup/confirm', {
        email: data.email,
        confirmation_code: data.confirmation_code
      });
      dispatch(slice.actions.getProfileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getResend(data) {
  return async (dispatch) => {
    try {
      await axios.post('/signup/resend_code', {
        email: data.email,
        type: 'register'
      });
      dispatch(slice.actions.getResendSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await axios.post('/auth/logout');
      dispatch(slice.actions.getLogout());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function login(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/auth/login', {
        email: data.email,
        password: data.password
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
