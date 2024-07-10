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

const LoginForm = () => {

  const loginFromRef = useRef();
  const { isLogedin } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLogin,
    { isLoading: loginLoading,
      isSuccess: loginSuccess,
      data: authData }] = useUserLoginMutation();

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
    if (loginSuccess && authData) {
      if (authData.isAuthenticated === false) {
        ToastService.error(authData.message)
      }
      else if (authData.isAuthenticated === true) {
        dispatch(authentication(authData));
      }
    }
  }, [loginSuccess, authData, dispatch])

  useEffect(() => {
    if (isLogedin) {
      navigate("/")
    }
  }, [isLogedin])

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