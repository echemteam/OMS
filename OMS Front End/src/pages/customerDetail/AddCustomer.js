import Stepper from "bs-stepper";
import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../components/ui/card/CardSection";
import BasicDetail from "./features/basicDetail/BasicDetail";
import AddressDetail from "./features/addressDetail/AddressDetail";
import ContactDetail from "./features/contactDetail/ContactDetail";
import Image from "../../components/image/Image";
import { AppIcons } from "../../data/appIcons";
import AddEditDocuments from "./features/documentsDetail/features/AddEditDocuments";
import BasicDetailContext from "../../utils/ContextAPIs/Customer/BasicDetailContext";


const AddCustomer = () => {
  const nextRef = useRef(null);
  const [customerKeyId , setCustomerKeyId] = useState(0)
  console.log("nextRef", nextRef)

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const addCustomer = () => {
    if (nextRef.current) {
      nextRef.current.handleAddBasicDetails();
    }
  };

  const [activeTab, setActiveTab] = useState(0);

  const incrementCurrent = () => {
    setActiveTab((prev) => prev + 1);
  };

  const decrementCurrent = () => {
    setActiveTab((prev) => prev - 1);
  };

  const handleCustomerKey = (data) => {
    debugger
    setCustomerKeyId(data)
  }

  console.log("customerKeyId" , customerKeyId)

  const tabContent = [
    {
      label: "Basic Information",
      subLabel: "Enter Basic information",
      content: <BasicDetail nextPage={incrementCurrent} onCustomerKey={handleCustomerKey}/>,
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
      content: <AddEditDocuments />,
    },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      {/* <BasicDetailContext.Provider value={{ stepperRef, nextRef }}>
        <div className="stepper-card">
          <CardSection>
            <div id="stepper1" className="bs-stepper stepper-section">
              <div className="bs-stepper-header">
                {steps.map((step, index) => (
                  <React.Fragment key={index}>
                    <div className="step" data-target={`#step-${index}`} >
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
                          <div className="d-flex justify-content-end">
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn dark-btn mr-3"
                                onClick={goBack}
                              >
                                Back
                              </button>
                            )}
                            {index < steps.length - 1 ? (
                              <button
                                type="button"
                                className="btn theme-button"
                                onClick={() => addCustomer()}
                              >
                                Next
                              </button>
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
          </CardSection>
        </div>
      </BasicDetailContext.Provider> */}
      <BasicDetailContext.Provider value={{ nextRef }}>
        <div className="stepper-card">
          <CardSection>
            <div className="stepper-section">
              <div className="stepper-header">
                {tabContent.map((step, index) => (
                  <React.Fragment key={index}>
                    <div className={`step ${activeTab === index ? 'active' : ''}`}>
                      <button className="step-button" onClick={() => handleTabClick(index)}>
                        <span className="stepper-box">{index + 1}</span>
                        <span className="stepper-label">
                          <span>{step.label}</span>
                          <span className="small-txt">{step.subLabel}</span>
                        </span>
                      </button>
                    </div>
                    {index < tabContent.length - 1 && (
                      <div className="right-arrow">
                        <Image imagePath={AppIcons.arrowIcon} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="stepper-content">
                <form onSubmit={onSubmit}>
                  {tabContent.map((step, index) => (
                    <div key={index} className={`content ${activeTab === index ? 'active' : ''}`}>
                      <div className="row">
                        <div className="col-12 mx-auto">
                          {step.content}
                          <div className="d-flex justify-content-end">
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn dark-btn mr-3"
                                onClick={decrementCurrent}
                              >
                                Back
                              </button>
                            )}
                            {index < tabContent.length - 1 ? (
                              <button
                                type="button"
                                className="btn theme-button"
                                onClick={addCustomer}
                              >
                                Next
                              </button>
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
          </CardSection>
        </div>
      </BasicDetailContext.Provider>
    </>
  );


};

export default AddCustomer;
