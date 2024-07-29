import React from "react";
import { AppIcons } from "../../../../data/appIcons";
import Image from "../../../../components/image/Image";
import OrderDetails from "../../feature/orderDetail/OrderDetails";

const AddOrderTab = ({ tabContent, activeTab }) => {
  const handleTabClick = (index) => {

  };

  const tabContents = [
    {
      label: "Add Order Information",
      subLabel: "Enter Order Basic information",
      content: <OrderDetails />
    },
    // {
    //   label: "Address",
    //   subLabel: "Enter Customer Address Details",
    //   content: < />
    // },
    // {
    //   label: "Contact",
    //   subLabel: "Enter Customer Contact Details",
    //   content: < />
    // },
    // {
    //   label: "Setting",
    //   subLabel: "Enter Customer Shipping Method",
    //   content: < />
    // },
    // {
    //   label: "Documents",
    //   subLabel: "Add Customer Documents Details",
    //   content: < />
    // },
  ];

  return (
    <div className="stepper-card">
      <div className="card">
        <div className="card-body-sec">
          <div className="stepper-section">
            <div className="stepper-header">
              {tabContents.map((step, index) => (
                <React.Fragment key={index}>
                  <div className={`step ${activeTab === index ? "active" : ""}`}>
                    <button
                      className="step-button"
                      onClick={() => handleTabClick(index)}
                    >
                      <span className="stepper-box">{index + 1}</span>
                      <span className="stepper-label">
                        <span>{step.label}</span>
                        <span className="small-txt">{step.subLabel}</span>
                      </span>
                    </button>
                  </div>
                  {index < tabContents.length - 1 && (
                    <div className="right-arrow">
                      <Image imagePath={AppIcons.arrowIcon} alt="Arrow" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderTab;
