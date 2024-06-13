

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react';

import authReducer from './slice/authSlice';
import authapi from './services/authAPI';
import userAPI from './services/userAPI';
import securityRoleAPI from './services/securityRoleAPI';
import rolesMappingAPI from './services/rolesMappingAPI';
import securityPermissionsAPI from './services/securityPermissionsAPI';
import basicdetailAPI from './services/basicdetailAPI';
import contactAPI from './services/contactAPI';
import addressAPI from './services/addressAPI';
import documentAPI from './services/documentAPI';
import notesAPI from './services/notesAPI';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authapi.reducerPath]: authapi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [securityRoleAPI.reducerPath]: securityRoleAPI.reducer,
    [rolesMappingAPI.reducerPath]: rolesMappingAPI.reducer,
    [securityPermissionsAPI.reducerPath]: securityPermissionsAPI.reducer,
    [basicdetailAPI.reducerPath]: basicdetailAPI.reducer, 
    [contactAPI.reducerPath]: contactAPI.reducer, 
    [addressAPI.reducerPath]: addressAPI.reducer, 
    [documentAPI.reducerPath]: documentAPI.reducer, 
    [notesAPI.reducerPath]:notesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    authapi.middleware,
    userAPI.middleware,
    securityRoleAPI.middleware,
    rolesMappingAPI.middleware,
    securityPermissionsAPI.middleware,
    basicdetailAPI.middleware,
    contactAPI.middleware,
    addressAPI.middleware,
    documentAPI.middleware,
    notesAPI.middleware,
  ),
})
setupListeners(store.dispatch);
