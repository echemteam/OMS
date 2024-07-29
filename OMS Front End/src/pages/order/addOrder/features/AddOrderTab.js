import React from "react";
import { AppIcons } from "../../../../data/appIcons";
import Image from "../../../../components/image/Image";
import OrderDetails from "../../feature/orderDetail/OrderDetails";
import { OrderTabEnum } from "../../../../utils/Enums/commonEnums";

const ContactDetail = React.lazy(() => import("../../feature/contactDetail/ContactDetail"));

const AddOrderTab = ({ tabContent, activeTab }) => {
  const handleTabClick = (index) => {

  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const tabContents = [
    {
      label: "Add Order Information",
      subLabel: "Enter Order Basic information",
      content: <OrderDetails />,
      tab: OrderTabEnum.BasicInformation,
    },
    {
      label: "Add Contact",
      subLabel: "Enter Contact Details",
      content: < ContactDetail />,
      tab: OrderTabEnum.Contact,
    },
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
            {/* <div className="stepper-content">
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
                          <button type="button" className="btn theme-button btn-next" onClick={() => addCustomer(step.tab)} >
                            Next  <Image imagePath={AppIcons.nextArrowIcon} />
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
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderTab;
