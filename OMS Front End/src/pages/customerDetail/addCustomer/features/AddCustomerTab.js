/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { useUpdateCustomerStatusMutation } from "../../../../app/services/basicdetailAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { StatusEnums } from "../../../../utils/Enums/StatusEnums";
import CardSection from "../../../../components/ui/card/CardSection";
import Image from "../../../../components/image/Image";
import { CustomerSettingEnum, CustomerSupplierTabEnum } from "../../../../utils/Enums/commonEnums";
import { AppIcons } from "../../../../data/appIcons";
import PropTypes from 'prop-types';


//** Compoent's */
const CustomerBasicDetail = React.lazy(() => import("../../feature/customerBasicDetail/CustomerBasicDetail"));
const CustomerSettingDetails = React.lazy(() => import("../../feature/customerSettingDetail/CustomerSettingDetails"));
const CustomerAddressDetail = React.lazy(() => import("../../feature/customerAddressDetail/CustomerAddressDetail"));
const CustomerDocumentDetail = React.lazy(() => import("../../feature/customerDocumentDetail/CustomerDocumentDetail"));
const CustomerContactDetail = React.lazy(() => import("../../feature/customerContactDetail/CustomerContactDetail"));

const AddCustomerTab = () => {
  const navigate = useNavigate();
  const { activeTab, movePreviewPage, addCustomer, customerId, showSubBackButton, handleActiveSubTabClick, saveFinacialSetting } = useContext(BasicDetailContext);

  const [
    updateCustomerStatus,
    {
      isSuccess: isSuccessUpdateCustomerStatus,
      data: updateCustomerStatusData,
    },
  ] = useUpdateCustomerStatusMutation();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isSuccessUpdateCustomerStatus && updateCustomerStatusData) {
      ToastService.success(updateCustomerStatusData.errorMessage);
      navigate("/Customers");
    }
  }, [isSuccessUpdateCustomerStatus, updateCustomerStatusData]);

  const tabContent = [
    {
      label: "Basic Information",
      subLabel: "Enter Customer Basic information",
      content: <CustomerBasicDetail isEditablePage={false} />,
      tab: CustomerSupplierTabEnum.BasicInformation,
    },
    {
      label: "Address",
      subLabel: "Enter Customer Address Details",
      content: <CustomerAddressDetail isEditablePage={false} />,
      tab: CustomerSupplierTabEnum.Address,
    },
    {
      label: "Contact",
      subLabel: "Enter Customer Contact Details",
      content: <CustomerContactDetail isEditablePage={false} isSearchFilterShow={false} />,
      tab: CustomerSupplierTabEnum.Contact,
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
      tab: CustomerSupplierTabEnum.Setting,
    },
    {
      label: "Documents",
      subLabel: "Add Customer Documents Details",
      content: <CustomerDocumentDetail isEditablePage={false} />,
      tab: CustomerSupplierTabEnum.Documents,
    },
  ];

  // const handleTabClick = (index) => {
  //   setActiveTab(index);
  // };

  const handleSubmit = () => {
    let req = {
      customerId: customerId,
      statusId: StatusEnums.Submitted,
    };
    updateCustomerStatus(req);
  };

  const handleDraft = () => {
    let req = {
      customerId: customerId,
      statusId: StatusEnums.Pending,
    };
    updateCustomerStatus(req);
  };

  return (
    <div className="stepper-card">
      <CardSection>
        <div className="stepper-section">
          <div className="stepper-header">
            {tabContent.map((step, index) => (
              <React.Fragment key={index}>
                <div className={`step ${activeTab === index ? "active" : ""}`} >
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
                <div key={index} className={`content ${activeTab === index ? "active" : ""}`} >
                  <div className="">
                    {step.content}
                    <div className="d-flex justify-content-end">
                      {index > 0 && !showSubBackButton && (
                        <button type="button" className="btn dark-btn mr-3" onClick={movePreviewPage} >
                          Back
                        </button>
                      )}
                      {index < tabContent.length - 1 ? (
                        activeTab === 3 ? (
                          <React.Fragment>
                            {!showSubBackButton ?
                              <button type="button" className="btn theme-button" onClick={saveFinacialSetting}>
                                Save Financial Settings
                              </button>
                              :
                              <button type="button" className="btn dark-btn mr-3" onClick={() => handleActiveSubTabClick(CustomerSettingEnum.FinancialSettings)} >
                                Back
                              </button>
                            }
                            <button type="button" className="btn theme-button ml-3" onClick={() => addCustomer(step.tab)}>
                              Next
                            </button>
                          </React.Fragment>
                        ) : (
                          <button type="button" className="btn theme-button" onClick={() => addCustomer(step.tab)} >
                            Next
                          </button>
                        )
                      ) : (
                        <>
                          <button type="submit" className="btn theme-button" onClick={handleDraft} >
                            Save as Draft
                          </button>

                          <button type="submit" className="btn theme-button ml-3" onClick={handleSubmit} >
                            Save as Submit
                          </button>
                        </>
                      )}
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

AddCustomerTab.propTypes = {
  activeTab: PropTypes.number ,
  movePreviewPage: PropTypes.func ,
  addCustomer: PropTypes.func ,
  customerId: PropTypes.number ,
  showSubBackButton: PropTypes.bool ,
  handleActiveSubTabClick: PropTypes.func ,
  saveFinacialSetting: PropTypes.func ,
};

export default AddCustomerTab;
