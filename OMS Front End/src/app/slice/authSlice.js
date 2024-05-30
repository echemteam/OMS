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
      const { securityPermissions, ...newAuthProps } = action.payload;
      setAuthProps(newAuthProps);
      const { isAuthenticated, message, token, user, sessionTimeout, ...permissionList } = action.payload;
      state.userPermissions = permissionList;
      saveData('SecurityPermission', permissionList);
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