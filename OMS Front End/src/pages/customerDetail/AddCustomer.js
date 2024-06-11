import React, { useRef, useState } from "react";
import CardSection from "../../components/ui/card/CardSection";
import BasicDetail from "./features/basicDetail/BasicDetail";
import AddressDetail from "./features/addressDetail/AddressDetail";
import ContactDetail from "./features/contactDetail/ContactDetail";
import Image from "../../components/image/Image";
import { AppIcons } from "../../data/appIcons";
import BasicDetailContext, { BasicDetailContextProvider } from "../../utils/ContextAPIs/Customer/BasicDetailContext";
import DocumentDetails from "./features/documentsDetail/DocumentDetails";
import SwalAlert from "../../services/swalService/SwalService";
import { useContext } from "react";


const AddCustomer = () => {
  const { error } = SwalAlert();
  const [activeTab, setActiveTab] = useState(0);
  const [addressNext, setAddressNext] = useState();
  const { nextRef, customerId } = useContext(BasicDetailContext);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const addCustomer = () => {
    if (customerId > 0) {
      if (addressNext.length > 0) {
        setActiveTab((prev) => prev + 1);
      } else {
        error("Please enter Address");
      }
    } else {
      if (nextRef.current) {
        nextRef.current.handleAddBasicDetails();
      }
    }
  };

  const incrementCurrent = () => {
    setActiveTab((prev) => prev + 1);
  };

  const decrementCurrent = () => {
    setActiveTab((prev) => prev - 1);
  };

  // const handleCustomerKey = (data) => {
  //   setcustomerId(data)
  // }

  const handleAddressNext = (data) => {
    setAddressNext(data)
  }

  const tabContent = [
    {
      label: "Basic Information",
      subLabel: "Enter Basic information",
      content: <BasicDetail nextPage={incrementCurrent} />,
    },
    {
      label: "Address",
      subLabel: "Enter Address Details",
      content: <AddressDetail onAddressNext={handleAddressNext} />,
    },
    {
      label: "Contact",
      subLabel: "Enter Contact Details",
      content: <ContactDetail />,
    },
    {
      label: "Documents",
      subLabel: "Add Documents",
      content: <DocumentDetails />,
    },
  ];

  // const handleTabClick = (index) => {
  //   setActiveTab(index);
  // };

  return (
    <>
      <div className="stepper-card">
        <CardSection>
          <div className="stepper-section">
            <div className="stepper-header">
              {tabContent.map((step, index) => (
                <React.Fragment key={index}>
                  <div className={`step ${activeTab === index ? 'active' : ''}`}>
                    <button className="step-button"
                      // onClick={() => handleTabClick(index)}
                    >
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
    </>
  );


};

export default AddCustomer;
