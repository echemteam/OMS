/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import FormCreator from "../../../components/Forms/FormCreator";
import Buttons from "../../../components/ui/button/Buttons";
import LoginFormData from "./LoginForm.data";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ToastService from "../../../services/toastService/ToastService";
import { authentication } from "../../../app/slice/authSlice";
import { useUserLoginMutation } from "../../../app/services/authAPI";
import { logUserLoginLogoutHistory } from "../../../utils/Thunk/UserHistory";
import { useLazyGetOrganizationAccountingDetailsQuery, useLazyGetOrganizationOtherChargesQuery, useLazyGetOrganizationShippingChargesQuery } from "../../../app/services/organizationAPI";
import { setOrganizationSettings } from "../../../app/slice/OrganizationSlice";

const LoginForm = () => {

  const loginFromRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogedin } = useSelector((state) => state.auth);
  const [userLogin, { isLoading: loginLoading, isSuccess: loginSuccess, data: authData }] = useUserLoginMutation();

  //**Get Organization Details  */
  const [getOtherCharges, { isFetching: isGetOtherChargesFetching, isSuccess: isGetOtherChargesSuccess, data: isGetOtherChargesData }] = useLazyGetOrganizationOtherChargesQuery();
  const [getAccountingDetails, { isFetching: isGetAccountingFetching, isSuccess: isGetAccountingSuccess, data: isGetAccountingData }] = useLazyGetOrganizationAccountingDetailsQuery();
  const [getShippingCharges, { isFetching: isGetShippingChargesFetching, isSuccess: isGetShippingChargesSuccess, data: isGetShippingChargesData }] = useLazyGetOrganizationShippingChargesQuery();

  const handleLogin = () => {
    let authData = loginFromRef.current.getFormData();
    if (authData) {
      let req = {
        userName: authData.email,
        password: authData.password
      }
      userLogin(req);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  };

  useEffect(() => {
    // Check if all fetching is complete
    if (!isGetOtherChargesFetching && isGetOtherChargesSuccess && isGetOtherChargesData &&
      !isGetAccountingFetching && isGetAccountingSuccess && isGetAccountingData &&
      !isGetShippingChargesFetching && isGetShippingChargesSuccess && isGetShippingChargesData) {
      // Dispatch all settings at once
      dispatch(setOrganizationSettings({
        otherCharge: isGetOtherChargesData,
        shippingSetting: isGetShippingChargesData,
        accountingSetting: isGetAccountingData
      }));
    }
  }, [
    isGetOtherChargesFetching, isGetOtherChargesSuccess, isGetOtherChargesData,
    isGetAccountingFetching, isGetAccountingSuccess, isGetAccountingData,
    isGetShippingChargesFetching, isGetShippingChargesSuccess, isGetShippingChargesData,
    dispatch
  ]);

  useEffect(() => {
    if (loginSuccess && authData) {
      if (authData.isAuthenticated === false) {
        ToastService.error(authData.message)
      }
      else if (authData.isAuthenticated === true) {
        dispatch(authentication(authData));
        // Track user login
        dispatch(logUserLoginLogoutHistory({
          userId: authData.user.userID, // Set appropriate userId from userData
          isLogin: authData.isAuthenticated
        }));
      }
    }
  }, [loginSuccess, authData, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (isLogedin) {
        await Promise.all([
          getOtherCharges(),
          getShippingCharges(),
          getAccountingDetails()
        ]);
      }
    };
    fetchData();
  }, [isLogedin]);

  // Check if all data has been successfully added before navigating
  useEffect(() => {
    const allDataFetched = !isGetOtherChargesFetching && isGetOtherChargesSuccess &&
      !isGetAccountingFetching && isGetAccountingSuccess &&
      !isGetShippingChargesFetching && isGetShippingChargesSuccess;
    if (allDataFetched) {
      navigate("/");
    }
  }, [isGetOtherChargesFetching, isGetOtherChargesSuccess, isGetAccountingFetching, isGetAccountingSuccess,
    isGetShippingChargesFetching, isGetShippingChargesSuccess, navigate]);

  return (
    <div className="login-form-section">
      <h2>Login</h2>
      <form onKeyPress={handleKeyPress}>
        <FormCreator
          ref={loginFromRef}
          config={LoginFormData}
          {...LoginFormData}
        // onFormDataUpdate={handleFormDataChange}
        ></FormCreator>
      </form>
      <div className="button-part">
        <Buttons
          buttonTypeClassName="info-btn"
          buttonText="Login"
          onClick={handleLogin}
          isLoading={loginLoading}
        />
      </div>
    </div>
  );
};

export default LoginForm;