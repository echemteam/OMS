import React from "react";
import "./Login.scss";
import LoginForm from "./features/Login";

const Login = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="login-section">
      <div className="row p-0 m-0">
        <div className="col-xxl-7 col-lg-7 col-md-6 col-12 p-0">
          <div className="left-bg-section">
            <h2>Welcome to</h2>
            {/* <Image
              imgCustomClassName="text-img"
              imagePath={AppIcons.logoText}
              altText="logo image"
            ></Image> */}
            <h1>OMS Lite</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley.
            </p>
            <p className="copyright">
              © {currentYear} <span>OMS Lite</span>. All rights reserved
            </p>
          </div>
        </div>
        <div className="col-xxl-5 col-lg-5 col-md-6 col-12 p-0">
          <div className="right-form-section">
            <LoginForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
