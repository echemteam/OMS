import Stepper from "bs-stepper";
import React, { useEffect, useRef } from "react";
import CardSection from "../../components/ui/card/CardSection";
import BasicDetail from "./features/basicDetail/BasicDetail";
import AddressDetail from "./features/addressDetail/AddressDetail";
import ContactDetail from "./features/contactDetail/ContactDetail";
import Image from "../../components/image/Image";
import { AppIcons } from "../../data/appIcons";
import AddEditDocuments from "./features/documentsDetail/AddEditDocuments";
const steps = [
  {
    label: "Basic Information",
    subLabel: "Enter Basic information",
    content: <BasicDetail />,
  },
  {
    label: "Address",
    subLabel: "Enter Address Details",
    content: <AddressDetail />,
  },
  {
    label: "Contact",
    subLabel: "Enter Contact Details",
    content: <ContactDetail />,
  },
  {
    label: "Documents",
    subLabel: "Add Documents",
    content: <AddEditDocuments/>,
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
    <div className="stepper-card">
      <CardSection>
        <div id="stepper1" className="bs-stepper stepper-section">
          <div className="bs-stepper-header">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="step" data-target={`#step-${index}`}>
                  <button className="step-trigger">
                    <span className="bs-stepper-circle">{index + 1}</span>
                    <span className="bs-ste pper-label">
                      <span>{step.label}</span>
                      <span className="small-txt">{step.subLabel}</span>
                    </span>
                  </button>
                </div>
                {index < steps.length - 1 && (
                  <div className="right-arrow">
                    <Image imagePath={AppIcons.arrowIcon} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="bs-stepper-content">
            <form onSubmit={onSubmit}>
              {steps.map((step, index) => (
                <div key={index} id={`step-${index}`} className="content">
                  <div className="row">
                    <div className="col-12 mx-auto">
                      <div>{step.content}</div>
                      {/* <div className="d-flex justify-content-end">
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
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      </CardSection>
    </div>
  );
};

export default AddCustomer;
