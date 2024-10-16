/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AppIcons } from "../../../../data/appIcons";
import Image from "../../../../components/image/Image";
import { OrderTabEnum } from "../../../../utils/Enums/commonEnums";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import AddOrderContext from "../../../../utils/Order/AddOrderContext";
import Iconify from "../../../../components/ui/iconify/Iconify";
import { useAddOrderMutation } from "../../../../app/services/orderAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { useNavigate } from "react-router-dom";

const ContactDetails = React.lazy(() =>
  import("../../feature/contactDetail/ContactDetails")
);
const OrderDetails = React.lazy(() =>
  import("../../feature/addOrderBasic/AddOrderBasicInformation")
);
const OrderItemDetail = React.lazy(() =>
  import("../../feature/orderItemDetail/OrderItemDetail")
);

const AddOrderTab = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editMode] = useState(false);
  const navigate = useNavigate();

  const { activeTab, movePreviewPage, addOrder, setActiveTab } = useContext(AddOrderContext);

  const [finalOrderInformationData, setFinalOrderInformationData] = useState({});
  const [finalOrderContactData, setFinalOrderContactData] = useState([]);

  const [
    addOrderApi,
    {
      isSuccess: isAddOrderApiSuccess,
      data: isAddOrderApiData,
    },
  ] = useAddOrderMutation();

  const handleOrderInformation = (data) => {
    setFinalOrderInformationData(data)
  }

    const handleOrderContact = (data) => {
    setFinalOrderContactData(data)
  }

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isAddOrderApiSuccess && isAddOrderApiData) {
      if (isAddOrderApiData.errorMessage.includes("exists")) {
        ToastService.warning(isAddOrderApiData.errorMessage);
        return;
      }
      ToastService.success(isAddOrderApiData.errorMessage);
      navigate("/OrderList");
    }
  }, [isAddOrderApiSuccess, isAddOrderApiData]);

    const AddOrderData = (finalOrderItemData) => {
    const orderData = {
      orderId: finalOrderInformationData.orderId || 0,
      orderMethodId: finalOrderInformationData.orderMethodId || 0,
      customerId: finalOrderInformationData.customerId || 0,
      subCustomerId: finalOrderInformationData.subCustomerId || 0,
      poNumber: finalOrderInformationData.poNumber || "",
      poDate: finalOrderInformationData.poDate ? finalOrderInformationData.poDate : null,
      orderReceivedDate: finalOrderInformationData.orderReceivedDate ? finalOrderInformationData.orderReceivedDate : null,
      isEndUser: finalOrderContactData.isEndUser || false,
      isInvoiceSubmission: finalOrderContactData.isInvoiceSubmission || false,
      isPurchasing: finalOrderContactData.isPurchasing || false,
      referenceNumber: finalOrderContactData.referenceNumber || "",
      pO_TotalOrderAmount: 0,
      currencyId: 0,
      billingAddressId: finalOrderInformationData.billingAddressId || 0,
      shippingAddressId: finalOrderInformationData.shippingAddressId || 0,
      orderItemsList: finalOrderItemData.orderItemsList || [],
      orderContactsList: finalOrderContactData.orderContactsList || [],
      orderChargeId: finalOrderItemData.orderChargeId || 0,
      chargeType: finalOrderItemData.chargeType || "",
      name: finalOrderItemData.name || "",
      orderItemId: finalOrderItemData.orderItemId || 0,
      documentName: finalOrderItemData.documentName || "",
      documentType: finalOrderItemData.documentType || 0,
      base64File: finalOrderItemData.base64File || "",
      storagePath: finalOrderItemData.storagePath || ""
    };
    addOrderApi(orderData)
  }

  const tabContents = [
    {
      label: "Add Order Information",
      subLabel: "Enter Order Basic information",
      content: <OrderDetails onHandleOrderInformation={handleOrderInformation} />,
      tab: OrderTabEnum.BasicInformation,
    },
    {
      label: "Add Contact",
      subLabel: "Enter Contact Details",
      content: <ContactDetails onHandleOrderContact={handleOrderContact} customerId={finalOrderInformationData.customerId} />,
      tab: OrderTabEnum.Contact,
    },
    {
      label: "Add Order Item",
      subLabel: "Enter Order Item Details",
      content: <OrderItemDetail onhandleAddOrderData={AddOrderData} />,
      tab: OrderTabEnum.OrderItem,
    },
  ];

  return (
    <div className="stepper-card order-stepper add-order-steps">
      <div className="card">
        <div className="card-body-sec order-body">
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
                      {/* <Image imagePath={AppIcons.arrowIcon} alt="Arrow" /> */}
                      <Iconify icon="solar:alt-arrow-down-outline" />
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
                      <div className="d-flex justify-content-end mt-3">
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn dark-btn mr-3 btn-prev"
                            onClick={movePreviewPage}
                          >
                            <Image imagePath={AppIcons.nextArrowIcon} /> Back
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn theme-button ml-3 btn-next"
                          onClick={() => addOrder(step.tab)}
                        >
                          {activeTab === 2 ? "Save" : "Next"} <Image imagePath={AppIcons.nextArrowIcon} />
                        </button>
                        {/* )} */}
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
