import React, { useRef } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import { testFormData } from "./TestForm.data";

const TestForm = (props) => {
  const emailFromRef = useRef();
  const handleFormDataChange = (formData) => {};

  return (
    <div className="form-field-sec">
      <div className="row">
        <div className="col-md-6 card">
          <div className="row align-items-center">
            <FormCreator
              ref={emailFromRef}
              {...testFormData}
              onFormDataUpdate={handleFormDataChange}
            ></FormCreator>
            <div className="col-xxl-12 col-xl-12 col-md-12 d-flex justify-content-end search-btn">
              <Buttons
                buttonTypeClassName="theme-btn"
                buttonText="Search"
                // onClick={handleLogin}
                // isLoading={loginLoading}
              />
              <Buttons
                buttonTypeClassName="gray-btn ml-3"
                buttonText="Cancel"
                // onClick={handleLogin}
                // isLoading={loginLoading}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row align-items-center">
            <FormCreator
              ref={emailFromRef}
              {...testFormData}
              onFormDataUpdate={handleFormDataChange}
            ></FormCreator>
            <div className="col-xxl-12 col-xl-12 col-md-12 d-flex justify-content-end search-btn">
              <Buttons
                buttonTypeClassName="theme-btn"
                buttonText="Search"
                // onClick={handleLogin}
                // isLoading={loginLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestForm;
