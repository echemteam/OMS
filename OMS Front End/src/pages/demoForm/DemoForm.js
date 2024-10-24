import React, { useRef } from "react";
import "./DemoForm.scss";
import FormCreator from "../../components/Forms/FormCreator";
import { testFormData } from "./features/formData/TestForm.data";
import Buttons from "../../components/ui/button/Buttons";

const DemoForm = () => {

  const testFromRef = useRef();

  return (
   
      <div className="Form-page-main">
        <div className="filter-sec">
          <div className="form-field-sec">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="row align-items-start">
                    <div className="col-md-12">
                      <div className="card-title">
                        <h4>Default Form</h4>
                        <p>Basic form layout</p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row vertical-form">
                        <FormCreator
                          config={testFormData}
                          ref={testFromRef}
                          {...testFormData}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mt-2">
                      <div className="d-flex align-item-center justify-content-start">
                        <Buttons
                          buttonTypeClassName="theme-button"
                          buttonText="Save"
                        />
                        <Buttons
                          buttonTypeClassName="dark-btn ml-5"
                          buttonText="Cancel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="row align-items-start">
                    <div className="col-md-12">
                      <div className="card-title">
                        <h4>Horizontal Form</h4>
                        <p>Horizontal form layout</p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row horizontal-form">
                        <FormCreator
                          config={testFormData}
                          ref={testFromRef}
                          {...testFormData}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mt-2">
                      <div className="d-flex align-item-center justify-content-start">
                        <Buttons
                          buttonTypeClassName="theme-button"
                          buttonText="Save"
                        />
                        <Buttons
                          buttonTypeClassName="dark-btn ml-5"
                          buttonText="Cancel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default DemoForm;
