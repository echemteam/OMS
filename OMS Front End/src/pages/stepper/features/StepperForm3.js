import React, { useRef } from "react";
import FormCreator from "../../../components/Forms/FormCreator";
import { Stepper3FormData } from "./formData/Stepper3.data";

const StepperForm3 = () => {

  const testFromRef = useRef();
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StepperForm3;
