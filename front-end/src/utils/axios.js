/* eslint-disable camelcase */
import axios from 'axios';
import { getProfileSuccess, getLogout } from '../redux/slices/user';

const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.REACT_APP_BACK_END_ENDPOINT
});

let subscribers = [];

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter((callback) => callback(access_token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

export const authorizationProvider = (store) => {
  api.interceptors.request.use(
    (config) => {
      const { user } = store.getState();
      const { myProfile } = user;
      if (myProfile) {
        const token = `Bearer ${myProfile.accessToken}`;
        if (token) {
          config.headers.Authorization = `${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  let isRefreshing = false;
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response ? error.response.status : null;
      if (status === 401) {
        const response = error.response.data.error;

        if (response.code === 4010 && response.message === 'Token expired') {
          if (!isRefreshing) {
            isRefreshing = true;
            const { user } = store.getState();
            const { myProfile } = user;
            const { refreshToken } = myProfile;
            api
              .post(`${process.env.REACT_APP_BACK_END_ENDPOINT}/auth/refresh_token`, {
                refresh_token: refreshToken
              })
              .then((res) => {
                store.dispatch(getProfileSuccess(res.data));
                onAccessTokenFetched(res.data.accessToken);
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
          const retryRequest = new Promise((resolve) => {
            const originalRequest = error.config;
            addSubscriber((access_token) => {
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
              resolve(api.request(originalRequest));
            });
          });

          return retryRequest;
        }
        if (response.code === 401 && response.message === 'Invalid token') {
          // Refresh token expired or token Invalid
          store.dispatch(getLogout());
        }
        return Promise.reject(response);
      }
      if (error.response && error.response.status === 400) {
        return Promise.reject(error.response);
      }
      if (error.response && error.response.status === 422) {
        return Promise.reject(error.response);
      }
      return Promise.reject(error);
    }
  );
};

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const { auth } = store.getState();
//     const user = auth.user;
//     if (user) {
//       const token = `Bearer ${user.accessToken}`;
//       if (token) {
//         config.headers.Authorization = `${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// );

export default api;
