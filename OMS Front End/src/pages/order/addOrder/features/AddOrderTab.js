import React, { useState } from "react";
import { AppIcons } from "../../../../data/appIcons";
import Image from "../../../../components/image/Image";
import { OrderTabEnum } from "../../../../utils/Enums/commonEnums";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
// import AddEditAddress from "../../../../common/features/component/Address/feature/AddEditAddress";

const ContactDetails = React.lazy(() =>
  import("../../feature/contactDetail/ContactDetails")
);
const OrderDetails = React.lazy(() =>
  import("../../feature/orderDetail/OrderDetails")
);
const OrderItemDetail = React.lazy(() =>
  import("../../feature/orderItemDetail/OrderItemDetail")
);

const AddOrderTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // const [editRef, setEditRef] = useState(null);
  // const [keyId, setKeyId] = useState(null); 
  // const [isButtonDisable, setIsButtonDisable] = useState(false); 
  // const [isSupplier, setIsSupplier] = useState(false); 
  // const [updateAddress, setUpdateAddress] = useState(null);
  // const [addAddress, setAddAddress] = useState(null); 
  // const [getAddresssById, setGetAddresssById] = useState(null); 

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleSaveClick = () => {
    setIsModelOpen(true);
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const moveNextPage = () => {
    setActiveTab((prev) => prev + 1);
  };

  const movePreviewPage = () => {
    setActiveTab((prev) => prev - 1);
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
      content: <ContactDetails />,
      tab: OrderTabEnum.Contact,
    },
    {
      label: "Add Order Item",
      subLabel: "Enter Order Item Details",
      content: <OrderItemDetail />,
      tab: OrderTabEnum.OrderItem,
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
                  {index < tabContents.length - 1 && (
                    <div className="right-arrow">
                      <Image imagePath={AppIcons.arrowIcon} alt="Arrow" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="stepper-content">
              <form onSubmit={onSubmit}>
                {tabContents.map((step, index) => (
                  <div
                    key={index}
                    className={`content ${activeTab === index ? "active" : ""}`}
                  >
                    <div className="">
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
                        <button
                          type="button"
                          className="btn theme-button ml-3"
                          onClick={moveNextPage}
                        >
                          Next
                        </button>
                        <button
                          type="button"
                          className="btn theme-button ml-3"
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </form>

              <div className="address-model">
                <SidebarModel
                  modalTitle={editMode ? "Update Address" : "Product Search"}
                  contentClass="content-35"
                  onClose={onSidebarClose}
                  modalTitleIcon={AppIcons.AddIcon}
                  isOpen={isModelOpen}
                >
                </SidebarModel>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderTab;
