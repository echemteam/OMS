import React, { useRef } from "react";
import FormCreator from "../../../components/Forms/FormCreator";
import { useNavigate } from "react-router-dom";
import { Stepper3FormData } from "./formData/Stepper3.data";

const StepperForm3 = () => {

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
            <h4>Form Data 3</h4>
            <p>Add Form data Hear</p>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row vertical-form">
            <FormCreator
              config={Stepper3FormData}
              ref={testFromRef}
              {...Stepper3FormData}
            // onFormDataUpdate={handleFormDataChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StepperForm3;
