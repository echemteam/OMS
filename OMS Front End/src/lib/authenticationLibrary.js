//*** Lib */

import { createCookie, getCookie, isCookieExist, removeAllCookies, setCookie } from "../utils/Cookies/CookieHandler";
import { removeData } from "../utils/LocalStorage/LocalStorageManager";
const authCookieName = 'AuthUser';
const tokenCookieName = 'Token';
const securityPermission = 'SecurityPermission';

export const setAuthProps = (data) => {
    const authProps = {
        cookieName: authCookieName,
        cookieValue: data,
        expirationTime: data.sessionTimeout
    }
    createCookie(authProps);
    setTokenProps(data.token);
}

export const setSecurityPermission = (data, sessionTimeout) => {
    const authProps = {
        cookieName: securityPermission,
        cookieValue: data,
        expirationTime: sessionTimeout
    }
    createCookie(authProps);
}

export const getAuthProps = () => {
    return getCookie(authCookieName);
}

export const isAuthorized = () => {
    return isCookieExist(authCookieName);
}

export const setTokenProps = (data) => {
    const tokenProps = {
        cookieName: tokenCookieName,
        cookieValue: data
    }
    setCookie(tokenProps);
}

export const getTokenProps = () => {
    return getCookie(tokenCookieName);
}

export const signOut = () => {
    removeAllCookies();
    //sessionStorage.removeItem('SecurityPermission');
    removeData("SecurityPermission")
    window.location.href = "/login";
}