import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from './../../app/slice/authSlice'
import { getAuthProps } from '../../lib/authenticationLibrary';
import { logUserLoginLogoutHistory } from '../Thunk/UserHistory';

const { Mutex } = require('async-mutex');

const mutex = new Mutex();

export const IsProdMode = true
export const IsTestMode = false

const testURL = process.env.REACT_APP_TESTURLSUSA
const localHost = process.env.REACT_APP_LOCALURLS

//** This is for Aurum */
const aurumLiveURL = process.env.REACT_APP_AURUM

const APIUrl = (IsProdMode) ? aurumLiveURL : (IsTestMode) ? testURL : localHost;

const baseQuery = fetchBaseQuery({
  baseUrl: APIUrl,
  prepareHeaders: (headers) => {

    headers.set("Content-Type", "application/json");
    // let authData = getAuthProps();
    // if (authData) {
    //   const token = authData.token.token; 
    //   headers.set("Authorization", `Bearer ${token}`);
    // }
    return headers;
  }
});

export const defaultBaseQuery = fetchBaseQuery({
  baseUrl: APIUrl,
  prepareHeaders: (headers) => {

    headers.set("Content-Type", "application/json");
    let authData = getAuthProps();
    if (authData) {
      const token = authData.token.token;
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  }

}); // Replace '/api' with your API base URL


export const fileUploadQuery = fetchBaseQuery({
  baseUrl: APIUrl,
  prepareHeaders: (headers) => {

    const boundary = `---------------------------${Math.floor(Math.random() * 1000000000000000)}`;

    headers.set("Content-Type", `multipart/form-data; boundary=${boundary}`);
    let authData = getAuthProps();
    let token = null;
    if (authData) {
      token = authData.token.token;
      headers.set("Authorization", `Bearer ${token}`);
    }

    // if (!token) {
    //   // dispatch(logout());
    //   window.location.href = '/login'
    //   return;
    // }

    return headers;
  }
})


export const customFetchBase = async (args, api, extraOptions) => {
  // Get the authorization token
  const authData = getAuthProps();
  let token = null
  if (authData)
    token = authData.token.token;

  if (!token) {
    // Handle the case where there is no token (user is not logged in)
    if (authData?.user?.userID) {
      await api.dispatch(logUserLoginLogoutHistory({
        userId: authData.user.userID,
        isLogin: false
      }));
    }
    api.dispatch(logout());
    window.location.href = '/login';
    return;
  }

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  // Add the authorization header to the request
  args.headers = {
    ...args.headers,
    Authorization: `Bearer ${token}`,
  };

  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    // Handle the case where the request returned an error, e.g., token expiration
    if (result.error.status === 401) {
      // Token expired or invalid
      if (authData?.user?.userID) {
        await api.dispatch(logUserLoginLogoutHistory({
          userId: authData.user.userID,
          isLogin: false
        }));
      }
      api.dispatch(logout());
      window.location.href = '/login';
    }
  }

  return result;
};


