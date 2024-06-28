import React, { useRef } from "react";
import FormCreator from "../../../components/Forms/FormCreator";
import { Stepper1FormData } from "./formData/Stepper1.data";

const StepperForm = () => {
  
  const testFromRef = useRef();
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StepperForm;
