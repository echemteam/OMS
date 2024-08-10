import React, { useEffect, useRef } from "react";
import "./Stepper.scss";

import Stepper from "bs-stepper";
import StepperForm from "./features/StepperForm";
import StepperForm2 from "./features/StepperForm2";
import StepperForm3 from "./features/StepperForm3";
import Buttons from "../../components/ui/button/Buttons";
import { AppIcons } from "../../data/appIcons";

const steps = [
  {
    label: "Step 1",
    content: <StepperForm />,
  },
  {
    label: "Step 2",
    content: <StepperForm2 />,
  },
  {
    label: "Step 3",
    content: <StepperForm3 />,
  },
  {
    label: "Step 4",
    content: <StepperForm3 />,
  },
];

const StepperComponent = () => {
  const stepperRef = useRef(null);

  useEffect(() => {
    stepperRef.current = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="card">
      <div id="stepper1" className="bs-stepper stepper-section">
        <div className="bs-stepper-header">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="step" data-target={`#step-${index}`}>
                <button className="step-trigger">
                  <span className="bs-stepper-circle">{index + 1}</span>
                  <span className="bs-stepper-label">{step.label}</span>
                </button>
              </div>
              {index < steps.length - 1 && <div className="line"></div>}
            </React.Fragment>
          ))}
        </div>
        <div className="bs-stepper-content">
          <form onSubmit={onSubmit}>
            {steps.map((step, index) => (
              <div key={index} id={`step-${index}`} className="content">
                <div className="row">
                  <div className="col-12 mx-auto">
                    {step.content}
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn dark-btn mr-3"
                        onClick={() => stepperRef.current.previous()}
                        imagePath={AppIcons.BackArrowIcon}
                      >
                        Back
                      </button>
                      {index < steps.length - 1 ? (
                         <Buttons buttonTypeClassName="back-button btn dark-btn" 
                         textWithIcon={true} buttonText="Back" imagePath={AppIcons.BackArrowIcon}></Buttons>
                      ) : (
                        <button type="submit" className="btn theme-button">
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepperComponent;
