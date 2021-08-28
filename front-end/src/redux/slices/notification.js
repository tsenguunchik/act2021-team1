import faker from 'faker';
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { mockImgProduct } from '../../layouts/dashboard/mockImages';

const initialState = {
  pending: false,
  loaded: false,
  error: false,
  notifications: []
};

const slice = createSlice({
  name: 'notification',
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

    getNotificationSuccess(state, action) {
      state.pending = false;
      state.error = false;
      const result = action.payload.map((notification, index) => ({
        ...notification,
        title: notification.information,
        description: '',
        avatar: null,
        type: 'mail',
        createdAt: notification.created_at,
        isUnRead: !notification.seen
      }));
      state.notifications = result;
    }
  }
});

export function getNotifications() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/notifications');
      dispatch(slice.actions.getNotificationSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getNotificationDetail(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/notifications/${id}`);
      dispatch(slice.actions.getNotificationSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// Reducer
export default slice.reducer;

// Actions
export const { clearIndicators } = slice.actions;
