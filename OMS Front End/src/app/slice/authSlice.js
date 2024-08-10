import { createSlice } from "@reduxjs/toolkit";
import { getAuthProps, setAuthProps, signOut } from "../../lib/authenticationLibrary";
import { saveData } from "../../utils/LocalStorage/LocalStorageManager";


const authData = getAuthProps();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: (authData != null),
    user: (authData?.user), //Set user data from cookie.
    token: (authData?.token), //Set token data from cookie.
    roles: (authData?.roles),
    authData,
    isLogedin: false
  },
  reducers: {
    // authentication: (state, action) => {
    //   //Use to create cookie.
    //   setAuthProps(action.payload);
    //   const { isAuthenticated, message, token, user, sessionTimeout, userDisplayName, userName } = action.payload;
    //   state.isLogedin = true;
    // },
    // logout: (state) => {
    //   state.isLogedin = false;
    //   signOut();
    // },
    authentication: (state, action) => {
      //Use to create cookie.
      const { securityPermissions, approvalRulesConfiguration, smtpSettings, ...newAuthProps } = action.payload;
      setAuthProps(newAuthProps);
      const { isAuthenticated, message, token, user, sessionTimeout, fullname, roles, ...permissionList } = action.payload;
      state.user = user;
      state.roles = roles;
      state.userPermissions = permissionList;
      saveData('SecurityPermission', permissionList);
      saveData('approvalRules', approvalRulesConfiguration);
      saveData('smtpSettings', smtpSettings);
      state.isLogedin = true;
      state.isPasswordResetRequired = action.payload.user.passwordResetRequired ? action.payload.user.passwordResetRequired : false
    },
    logout: (state) => {
      state.isLogedin = false;
      signOut();
    },
    updatePermission: (state, action) => {
      saveData('SecurityPermission', action.payload);
      state.userPermissions = action.payload;
    }
  },
});


export const { authentication, logout } = authSlice.actions;
export default authSlice.reducer;