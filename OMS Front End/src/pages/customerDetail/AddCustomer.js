import { useContext } from "react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//**Lib's */
import { AppIcons } from "../../data/appIcons";
import Image from "../../components/image/Image";
import CardSection from "../../components/ui/card/CardSection";
import { TabEnum } from "../../common/features/Enums/TabsEnums";
import ToastService from "../../services/toastService/ToastService";
import { StatusEnums } from "../../common/features/Enums/StatusEnums";
import BasicDetailContext from "../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import { useUpdateCustomerStatusMutation } from "../../app/services/basicdetailAPI";
import CustomerDocumentDetails from "./features/documentsDetail/CustomerDocumentDetails";
//** Component's */
const BasicDetail = React.lazy(() =>
  import("./features/basicDetail/BasicDetail")
);
const AddressDetail = React.lazy(() =>
  import("./features/addressDetail/AddressDetail")
);
const DocumentDetails = React.lazy(() =>
  import("./features/documentsDetail/DocumentDetails")
);
const CustomerContactDetails = React.lazy(() =>
  import("./features/contactDetail/Contact/CustomerContactDetails")
);

const AddCustomer = () => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, movePreviewPage, addCustomer, customerId } =
    useContext(BasicDetailContext);
  const [
    updateCustomerStatus,
    {
      isLoading: updateCustomerStatusLoading,
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
      content: <BasicDetail />,
      tab: TabEnum.BasicInformation,
    },
    {
      label: "Address",
      subLabel: "Enter Customer Address Details",
      content: <AddressDetail isEditablePage={false} />,
      tab: TabEnum.Address,
    },
    {
      label: "Contact",
      subLabel: "Enter Customer Contact Details",
      content: <CustomerContactDetails isEditablePage={false} />,
      tab: TabEnum.Contact,
    },
    {
      label: "Documents",
      subLabel: "Add Customer Documents Details",
      content: <CustomerDocumentDetails isEditablePage={false} />,
      tab: TabEnum.Documents,
    },
    {
      label: "Setting",
      subLabel: "Shipping Method",
      content: 
      <>
      
      </>,
      tab: TabEnum.Contact,
    },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleSubmit = () => {
    let req = {
      customerId: customerId,
      statusId: StatusEnums.Approved,
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
    <>
      <div className="stepper-card">
        <CardSection>
          <div className="stepper-section">
            <div className="stepper-header">
              {tabContent.map((step, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`step ${activeTab === index ? "active" : ""}`}
                  >
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
                  <div
                    key={index}
                    className={`content ${activeTab === index ? "active" : ""}`}
                  >
                    <div className="row">
                      <div className="col-12 mx-auto">
                        {step.content}
                        <div className="d-flex justify-content-end">
                          {index > 0 && (
                            <button
                              type="button"
                              className="btn dark-btn mr-3"
                              onClick={movePreviewPage}
                            >
                              Back
                            </button>
                          )}
                          {index < tabContent.length - 1 ? (
                            <button
                              type="button"
                              className="btn theme-button"
                              onClick={() => addCustomer(step.tab)}
                            >
                              Next
                            </button>
                          ) : (
                            <>
                              <button
                                type="submit"
                                className="btn theme-button"
                                onClick={handleDraft}
                              >
                                Save as Draft
                              </button>

                              <button
                                type="submit"
                                className="btn theme-button ml-3"
                                onClick={handleSubmit}
                              >
                                Save as Submit
                              </button>
                            </>
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
