import React from "react";
import { AppIcons } from "../../data/appIcons";
import Image from "../../components/image/Image";
import CustomerBasicDetail from "../customerDetail/feature/customerBasicDetail/CustomerBasicDetail";
import CustomerAddressDetail from "../customerDetail/feature/customerAddressDetail/CustomerAddressDetail";
import CustomerContactDetail from "../customerDetail/feature/customerContactDetail/CustomerContactDetail";
import CustomerSettingDetails from "../customerDetail/feature/customerSettingDetail/CustomerSettingDetails";
import CustomerDocumentDetail from "../customerDetail/feature/customerDocumentDetail/CustomerDocumentDetail";

import "./Order.scss";
import { CustomerSupplierTabEnum } from "../../utils/Enums/commonEnums";

const Order = ({ tabContent, activeTab }) => {
  const handleTabClick = (index) => {
    // Define your tab click handler logic here if needed
  };

  const tabContents = [
    {
      label: "Basic Information",
      subLabel: "Enter Customer Basic information",
      content: <CustomerBasicDetail isEditablePage={false} />,
      tab: CustomerSupplierTabEnum.BasicInformation, // Uncomment and define if needed
    },
    {
      label: "Address",
      subLabel: "Enter Customer Address Details",
      content: <CustomerAddressDetail isEditablePage={false} />,
      tab: CustomerSupplierTabEnum.Address, // Uncomment and define if needed
    },
    {
      label: "Contact",
      subLabel: "Enter Customer Contact Details",
      content: (
        <CustomerContactDetail
          isEditablePage={false}
          isSearchFilterShow={false}
        />
      ),
      tab: CustomerSupplierTabEnum.Contact, // Uncomment and define if needed
    },
    {
      label: "Setting",
      subLabel: "Enter Customer Shipping Method",
      content: (
        <>
          <div className="mt-0">
            <CustomerSettingDetails isEditablePage={false} />
          </div>
        </>
      ),
      tab: CustomerSupplierTabEnum.Setting, // Uncomment and define if needed
    },
    {
      label: "Documents",
      subLabel: "Add Customer Documents Details",
      content: <CustomerDocumentDetail isEditablePage={false} />,
      tab: CustomerSupplierTabEnum.Documents, // Uncomment and define if needed
    },
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

export default Order;
