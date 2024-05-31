import Stepper from "bs-stepper";
import React, { useEffect, useRef } from "react";
import CardSection from "../../components/ui/card/CardSection";
import BasicDetail from "./features/basicDetail/BasicDetail";
import AddressDetail from "./features/addressDetail/AddressDetail";
import ContactDetail from "./features/contactDetail/ContactDetail";
const steps = [
  {
    label: "Basic Information",
    content: <BasicDetail />,
  },
  {
    label: "Address",
    content: <AddressDetail />,
  },
  {
    label: "Contact",
    content: <ContactDetail />,
  },
  {
    label: "Setting",
    content: "<StepperForm3 />",
  },
  {
    label: "Documents",
    content: "<StepperForm3 />",
  },
];

const AddCustomer = () => {
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
    <>
      
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
                    <CardSection>
                      {step.content}
                      
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn dark-btn mr-3"
                          onClick={() => stepperRef.current.previous()}
                        >
                          Back
                        </button>
                        {index < steps.length - 1 ? (
                          <button
                            type="button"
                            className="btn theme-button"
                            onClick={() => stepperRef.current.next()}
                          >
                            Next
                          </button>
                        ) : (
                          <button type="submit" className="btn theme-button">
                            Submit
                          </button>
                        )}
                      </div>
                      </CardSection>
                    </div>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      
    </>
  );
};

export default AddCustomer;
