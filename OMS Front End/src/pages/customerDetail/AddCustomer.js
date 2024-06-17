import React, { useEffect } from "react";
import { useContext } from "react";
//**Lib's */
import { AppIcons } from "../../data/appIcons";
import Image from "../../components/image/Image";
import CardSection from "../../components/ui/card/CardSection";
import BasicDetailContext from "../../utils/ContextAPIs/Customer/BasicDetailContext";
import { TabEnum } from "../../common/features/Enums/TabsEnums";
import { useNavigate } from "react-router-dom";
import { useUpdateCustomerStatusMutation } from "../../app/services/basicdetailAPI";
import ToastService from "../../services/toastService/ToastService";
import { StatusEnums } from "../../common/features/Enums/StatusEnums";
import { useAddEditContactMutation, useLazyGetAllContactTypesQuery, useLazyGetContactByCustomerIdQuery } from "../../app/services/contactAPI";
//** Component's */
const BasicDetail = React.lazy(() => import("./features/basicDetail/BasicDetail"));
const AddressDetail = React.lazy(() => import("./features/addressDetail/AddressDetail"));
const DocumentDetails = React.lazy(() => import("./features/documentsDetail/DocumentDetails"));
const ContactDetail = React.lazy(() => import("./features/contactDetail/Contact/ContactDetail"));

const AddCustomer = () => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, movePreviewPage, addCustomer, customerId } = useContext(BasicDetailContext);
  const [updateCustomerStatus, { isLoading: updateCustomerStatusLoading, isSuccess: isSuccessUpdateCustomerStatus, data: updateCustomerStatusData }] = useUpdateCustomerStatusMutation();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isSuccessUpdateCustomerStatus && updateCustomerStatusData) {
      ToastService.success(updateCustomerStatusData.errorMessage);
    }
  }, [isSuccessUpdateCustomerStatus, updateCustomerStatusData]);

  const tabContent = [
    {
      label: "Basic Information",
      subLabel: "Enter Customer Basic information",
      content: <BasicDetail />,
      tab: TabEnum.BasicInformation
    },
    {
      label: "Address",
      subLabel: "Enter Customer Address Details",
      content: <AddressDetail />,
      tab: TabEnum.Address
    },
    {
      label: "Contact",
      subLabel: "Enter Customer Contact Details",
      content: <ContactDetail getContactByIdQuery={useLazyGetContactByCustomerIdQuery} useAddEditContactMutation={useAddEditContactMutation}/>,
      tab: TabEnum.Contact
    },
    {
      label: "Documents",
      subLabel: "Add Customer Documents Details",
      content: <DocumentDetails />,
      tab: TabEnum.Documents
    },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleSubmit = () => {
    let req = {
      customerId: customerId,
      statusId: StatusEnums.Approved
    }
    updateCustomerStatus(req)
  };

  const handleDraft = () => {
    navigate('/Customers');
  };


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
                  <div key={index} className={`content ${activeTab === index ? 'active' : ''}`}>
                    <div className="row">
                      <div className="col-12 mx-auto">
                        {step.content}
                        <div className="d-flex justify-content-end">
                          {index > 0 && (
                            <button type="button" className="btn dark-btn mr-3" onClick={movePreviewPage} >
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
                              <button type="submit" className="btn theme-button" onClick={handleDraft}>
                                Save as Draft
                              </button>

                              <button type="submit" className="btn theme-button ml-3" onClick={handleSubmit}>
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
