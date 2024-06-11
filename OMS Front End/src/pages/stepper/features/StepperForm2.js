import React, { useRef } from "react";
import FormCreator from "../../../components/Forms/FormCreator";
import { useNavigate } from "react-router-dom";
import { Stepper2FormData } from "./formData/Stepper2.data";

const StepperForm2 = () => {
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
            <h4>Form Data 2</h4>
            <p>Add Form data Hear</p>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row vertical-form">
            <FormCreator
              config={Stepper2FormData}
              ref={testFromRef}
              {...Stepper2FormData}
            // onFormDataUpdate={handleFormDataChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StepperForm2;
