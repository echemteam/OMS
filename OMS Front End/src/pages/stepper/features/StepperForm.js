import React, { useRef } from "react";
import FormCreator from "../../../components/Forms/FormCreator";
import { useNavigate } from "react-router-dom";
import { Stepper1FormData } from "./formData/Stepper1.data";

const StepperForm = () => {
  const navigate = useNavigate();

  // const handleAddEditCampaign = () => {
  //   navigate("/AddEditCampaign"); // Replace '/dashboard' with your actual dashboard route
  // };
  const testFromRef = useRef();
  // c
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card-title">
            <h4>Form Data</h4>
            <p>Add Form data Hear</p>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row vertical-form">
            <FormCreator
              config={Stepper1FormData}
              ref={testFromRef}
              {...Stepper1FormData}
            // onFormDataUpdate={handleFormDataChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StepperForm;
