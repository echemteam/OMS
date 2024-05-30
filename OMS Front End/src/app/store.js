

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react';

import authReducer from './slice/authSlice';
import authapi from './services/authAPI';
import userAPI from './services/userAPI';
import securityRoleAPI from './services/securityRoleAPI';
import rolesMappingAPI from './services/rolesMappingAPI';
import securityPermissionsAPI from './services/securityPermissionsAPI';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authapi.reducerPath]: authapi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [securityRoleAPI.reducerPath]: securityRoleAPI.reducer,
    [rolesMappingAPI.reducerPath]: rolesMappingAPI.reducer,
    [securityPermissionsAPI.reducerPath]: securityPermissionsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    authapi.middleware,
    userAPI.middleware,
    securityRoleAPI.middleware,
    rolesMappingAPI.middleware,
    securityPermissionsAPI.middleware
  ),
})
setupListeners(store.dispatch);
