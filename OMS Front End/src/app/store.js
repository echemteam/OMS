

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
import phoneNumberAPI from './services/phoneNumberAPI';
import emailAddressAPI from './services/emailAddressAPI';
import customerSettingsAPI from './services/customerSettingsAPI';
import supplierAPI from './services/supplierAPI';
import supplierNotesAPI from './services/supplierNotesAPI';
import supplierDocuementsAPI from './services/supplierDocuementsAPI'
import supplierAddressAPI from './services/supplierAddressAPI';
import commonAPI from './services/commonAPI';
import customerHistoryAPI from './services/customerHistoryAPI';
import supplierHistoryAPI from './services/supplierHistoryAPI';
import approvalAPI from './services/ApprovalAPI';
import configurationAPI from './services/configurationAPI';
import apiProviderAPI from './services/apiProviderAPI';
import apiEndPointsAPI from './services/apiEndPointsAPI';
import apiParametersAPI from './services/apiParametersAPI';
import apiAuthenticationAPI from './services/apiAuthenticationAPI';
import customerSubCustomerAPI from './services/customerSubCustomerAPI';
import organizationAPI from './services/organizationAPI';
import supplierFinancialSettingsAPI from './services/supplierFinancialSettingsAPI';

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
    [configurationAPI.reducerPath]: configurationAPI.reducer, 
    [documentAPI.reducerPath]: documentAPI.reducer, 
    [notesAPI.reducerPath]:notesAPI.reducer,
    [phoneNumberAPI.reducerPath]: phoneNumberAPI.reducer, 
    [emailAddressAPI.reducerPath]: emailAddressAPI.reducer, 
    [customerSettingsAPI.reducerPath]:customerSettingsAPI.reducer,
    [supplierAPI.reducerPath]:supplierAPI.reducer,
    [supplierNotesAPI.reducerPath]:supplierNotesAPI.reducer,
    [supplierDocuementsAPI.reducerPath]:supplierDocuementsAPI.reducer,
    [commonAPI.reducerPath]: commonAPI.reducer,
    [supplierAddressAPI.reducerPath]: supplierAddressAPI.reducer,
    [customerHistoryAPI.reducerPath]:customerHistoryAPI.reducer,
    [supplierHistoryAPI.reducerPath]:supplierHistoryAPI.reducer,
    [approvalAPI.reducerPath]: approvalAPI.reducer,
    [apiProviderAPI.reducerPath]: apiProviderAPI.reducer,
    [apiEndPointsAPI.reducerPath]:apiEndPointsAPI.reducer,
    [apiParametersAPI.reducerPath]:apiParametersAPI.reducer,
    [apiAuthenticationAPI.reducerPath]:apiAuthenticationAPI.reducer,
    [customerSubCustomerAPI.reducerPath]:customerSubCustomerAPI.reducer,
    [organizationAPI.reducerPath]:organizationAPI.reducer,
    [supplierFinancialSettingsAPI.reducerPath]:supplierFinancialSettingsAPI.reducer,

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
    configurationAPI.middleware,
    documentAPI.middleware,
    notesAPI.middleware,
    phoneNumberAPI.middleware,
    emailAddressAPI.middleware,
    customerSettingsAPI.middleware,
    supplierAPI.middleware,
    supplierNotesAPI.middleware,
    supplierDocuementsAPI.middleware,
    commonAPI.middleware,
    supplierAddressAPI.middleware,
    customerHistoryAPI.middleware,
    supplierHistoryAPI.middleware,
    approvalAPI.middleware,
    apiProviderAPI.middleware,
    apiEndPointsAPI.middleware,
    apiParametersAPI.middleware,
    apiAuthenticationAPI.middleware,
    customerSubCustomerAPI.middleware,
    organizationAPI.middleware,
    supplierFinancialSettingsAPI.middleware,
  ),
})
setupListeners(store.dispatch);
