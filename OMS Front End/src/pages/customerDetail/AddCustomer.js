/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppIcons } from "../../data/appIcons";
import Image from "../../components/image/Image";
import { TabEnum, settingEnum } from "../../utils/Enums/enums";
import { StatusEnums } from "../../utils/Enums/StatusEnums";
import CardSection from "../../components/ui/card/CardSection";
import ToastService from "../../services/toastService/ToastService";
import { useUpdateCustomerStatusMutation } from "../../app/services/basicdetailAPI";
import BasicDetailContext from "../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Compoent's */
const CustomerDocumentDetails = React.lazy(() => import("./features/documentsDetail/CustomerDocumentDetails"));
const CustomerBasicDetail = React.lazy(() => import("./feature/customerBasicDetail/CustomerBasicDetail"));
const SettingDetails = React.lazy(() => import("./features/settingDetail/SettingDetails"));
const CustomerContactDetails = React.lazy(() => import("./features/contactDetail/Contact/CustomerContactDetails"));
const CustomerAddressDetails = React.lazy(() => import("./feature/customerAddressDetail/CustomerAddressDetail"));

const AddCustomer = () => {
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
      content: <CustomerBasicDetail />,
      tab: TabEnum.BasicInformation,
    },
    {
      label: "Address",
      subLabel: "Enter Customer Address Details",
      content: <CustomerAddressDetails isEditablePage={false} />,
      tab: TabEnum.Address,
    },
    {
      label: "Contact",
      subLabel: "Enter Customer Contact Details",
      content: <CustomerContactDetails isEditablePage={false} isSearchFilterShow={false} />,
      tab: TabEnum.Contact,
    },
    {
      label: "Setting",
      subLabel: "Enter Customer Shipping Method",
      content: (
        <>
          <div className="mt-0">
            <SettingDetails isEditablePage={false} />
          </div>
        </>
      ),
      tab: TabEnum.Setting,
    },
    {
      label: "Documents",
      subLabel: "Add Customer Documents Details",
      content: <CustomerDocumentDetails isEditablePage={false} />,
      tab: TabEnum.Documents,
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
                                <button type="button" className="btn dark-btn mr-3" onClick={() => handleActiveSubTabClick(settingEnum.FinancialSettings)} >
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

export default AddCustomer;
