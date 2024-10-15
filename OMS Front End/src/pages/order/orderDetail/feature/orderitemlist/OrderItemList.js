/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import {
  useDeleteOrderItemMutation,
  useLazyGetOrderItemsByOrderIdQuery,
} from "../../../../../app/services/orderAPI";
import { decryptUrlData } from "../../../../../services/CryptoService";
import { useParams } from "react-router-dom";
import formatDate from "../../../../../lib/formatDate";
import ShippingAddressDetailsModel from "./feature/ShippingAddressDetailsModel";
import OrderNoteDetailsModel from "./feature/OrderNoteDetailsModel";
import ToastService from "../../../../../services/toastService/ToastService";
import SwalAlert from "../../../../../services/swalService/SwalService";
import NoRecordFound from "../../../../../components/FinalMolGrid/ui/noRecordFound/NoRecordFound";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";

/** Lazily Loaded Components */
const UpdateOrderItem = React.lazy(() => import("./feature/UpdateOrderItem"));

const OrderItemList = ({
  isUpdateOrderItemShippingAddRef,
  orderDetails,
  handleOrderItemShippingAddress,
}) => {
  const { id } = useParams();
  const orderItemref = useRef();
  const { confirm } = SwalAlert();
  const orderId = id ? decryptUrlData(id) : 0;
  const [itemList, setItemList] = useState([]);
  const [activeKey, setActiveKey] = useState([]);

  const handleToggle = (key) => {
    if (activeKey.includes(key)) {
      setActiveKey(activeKey.filter((k) => k !== key));
    } else {
      setActiveKey([...activeKey, key]);
    }
  };

  const [
    deleteOrderItem,
    { isSuccess: isDeleteOrderItemSuccess, data: isDeleteOrderItemData },
  ] = useDeleteOrderItemMutation();
  const [
    getOrderItemsByOrderId,
    {
      isFetching: isGetOrderItemsByOrderIdFetching,
      isSuccess: isGetOrderItemsByOrderIdSuccess,
      data: isGetOrderItemsByOrderIdData,
    },
  ] = useLazyGetOrderItemsByOrderIdQuery();

  useEffect(() => {
    getOrderItemList();
  }, [orderId]);

  useImperativeHandle(isUpdateOrderItemShippingAddRef, () => ({
    getOrderItemList,
  }));

  const getOrderItemList = () => {
    orderId && getOrderItemsByOrderId(orderId);
  };

  useEffect(() => {
    if (
      !isGetOrderItemsByOrderIdFetching &&
      isGetOrderItemsByOrderIdSuccess &&
      isGetOrderItemsByOrderIdData
    ) {
      setItemList(isGetOrderItemsByOrderIdData);
    }
  }, [
    isGetOrderItemsByOrderIdFetching,
    isGetOrderItemsByOrderIdSuccess,
    isGetOrderItemsByOrderIdData,
  ]);

  useEffect(() => {
    if (isDeleteOrderItemSuccess && isDeleteOrderItemData) {
      ToastService.success(isDeleteOrderItemData.errorMessage);
      onGetData();
    }
  }, [isDeleteOrderItemSuccess, isDeleteOrderItemData]);

  const handleDeleteClick = (orderItemId) => {
    confirm(
      "Delete?",
      "Are you sure you want to Delete?",
      "Delete",
      "Cancel"
    ).then((confirmed) => {
      if (confirmed) {
        deleteOrderItem(orderItemId);
      }
    });
  };

  const handleEdit = (orderItemId) => {
    if (orderItemref.current) {
      orderItemref.current.handleToggleModal(orderItemId);
    }
  };

  const onGetData = () => {
    getOrderItemsByOrderId(orderId);
  };
  const getStatusClass = (itemStatus) => {
    const formattedStatus = itemStatus.toLowerCase().replace(/\s+/g, "-");
    return `status-btn ${formattedStatus}`;
  };

  //Menu Placement Function
  const hoverRef = useRef(null);
  const noteCardRef = useRef(null);
  const shippingHoverRef = useRef(null);
  const shippingCardRef = useRef(null);

  const handleHover = (hoverElement, cardElement) => {
    if (hoverElement && cardElement) {
      const hoverRect = hoverElement.getBoundingClientRect();
      const spaceBelow = window.innerHeight - hoverRect.bottom;
      const spaceAbove = hoverRect.top;

      if (spaceBelow < 200 && spaceAbove > 200) {
        cardElement.style.top = "auto";
        cardElement.style.bottom = "100%";
      } else {
        cardElement.style.top = "100%";
        cardElement.style.bottom = "auto";
      }
    }
  };

  const resetHover = (cardElement) => {
    if (cardElement) {
      cardElement.style.top = "100%";
      cardElement.style.bottom = "auto";
    }
  };

  const handleShippingHover = () =>
    handleHover(shippingHoverRef.current, shippingCardRef.current);
  const resetShippingHover = () => resetHover(shippingCardRef.current);

  const handleNoteHover = () =>
    handleHover(hoverRef.current, noteCardRef.current);
  const resetNoteHover = () => resetHover(noteCardRef.current);

  return (
    <div>
      <div className="order-item-list">
        <CardSection>
          <div className="order-all-item-view">
            <div className="accordian-title">
              <span>Catalog ID</span>
              <span>Cas Number</span>
              <span>Pack Size</span>
              <span>Unit Price</span>
              <span>Total Price</span>
              <span>Status</span>
            </div>
          </div>
          <div className="accordian-desc">
            {!isGetOrderItemsByOrderIdFetching ? (
              <Accordion activeKey={activeKey}>
                {itemList?.length >= 0 ? (
                  <>
                    {/* */}
                    {itemList.map((item, index) => {
                      const address = item?.orderShippingAddress
                        ? item?.orderShippingAddress
                        : orderDetails?.orderAddressInformation
                            ?.shippingAddress;
                      const addressId = item?.orderShippingAddress?.addressId
                        ? item?.orderShippingAddress.addressId
                        : orderDetails?.orderAddressInformation?.shippingAddress
                            ?.addressId;
                      return (
                        <Accordion.Item eventKey={item.orderItemId} key={index}>
                          <Accordion.Header
                            onClick={() => handleToggle(item.orderItemId)}
                          >
                            <div className="header-items">
                              <span>
                                {item.catalogId ? item.catalogId : "-"}
                              </span>
                              <span>
                                {item.casNumber ? item.casNumber : "-"}
                              </span>
                              <span>
                                {`${item?.quantity} X ${item?.packSize} ${item?.unit}`}
                              </span>
                              <span>
                                {item.itemUnitPrice
                                  ? `$${item.itemUnitPrice?.toFixed(2)}`
                                  : "-"}
                              </span>
                              <span>
                                $
                                {(
                                  (item?.quantity || 0) *
                                  (item?.itemUnitPrice || 0)
                                )?.toFixed(2)}
                              </span>
                              <span>
                                <div
                                  className={getStatusClass(item.itemStatus)}
                                >
                                  {item.itemStatus}
                                </div>
                              </span>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className="row">
                              <div className="col-xxl-6 col-lg-6 col-md-6 col-12 custom-col-5">
                                <div className="key-value-se align-items-start">
                                  <span className="key-sec">Name</span>
                                  &nbsp;:&nbsp;
                                  <span className="value-sec">
                                    {item.chemicalName
                                      ? item.chemicalName
                                      : "N/A"}
                                  </span>
                                </div>
                                <div className="key-value-se">
                                  <span className="key-sec">MDL Number </span>
                                  <span className="value-sec">
                                    &nbsp;:&nbsp;{" "}
                                    {item.mdlNumber ? item.mdlNumber : "N/A"}
                                  </span>
                                </div>
                                <div
                                  className="key-value-se"
                                  ref={shippingHoverRef}
                                  onMouseEnter={handleShippingHover}
                                  onMouseLeave={resetShippingHover}
                                >
                                  <span className="key-sec">Shipping Add.</span>
                                  &nbsp;:&nbsp;
                                  <div className="value-right-btn">
                                    <span className="right-btn">
                                      <span className="info-btn hover-model">
                                        <Iconify
                                          icon="ep:info-filled"
                                          className="swap-icon"
                                        />
                                        <span
                                          className="address-card"
                                          ref={shippingCardRef}
                                        >
                                          <ShippingAddressDetailsModel
                                            address={address}
                                          />
                                        </span>
                                      </span>
                                      <span
                                        className="info-btn tooltip-div"
                                        onClick={() =>
                                          handleOrderItemShippingAddress(
                                            "Shipping",
                                            addressId,
                                            item?.orderItemId
                                          )
                                        }
                                      >
                                        <Iconify
                                          icon="icon-park-outline:change"
                                          className="swap-icon"
                                        />
                                        <div className="tooltip-show">
                                          <p>Change Address</p>
                                        </div>
                                        <div className="tooltip-arrow-icon"></div>
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="key-value-se"
                                  ref={hoverRef}
                                  onMouseEnter={handleNoteHover}
                                  onMouseLeave={resetNoteHover}
                                >
                                  <span className="key-sec">Order Notes</span>
                                  &nbsp;:&nbsp;
                                  <div className="value-right-btn">
                                    <span className="right-btn">
                                      <span className="info-btn hover-model">
                                        <Iconify
                                          icon="ep:info-filled"
                                          className="swap-icon"
                                        />
                                        <span
                                          className="note-card"
                                          ref={noteCardRef}
                                        >
                                          <OrderNoteDetailsModel
                                            orderNoteDetails={item?.orderNote}
                                          />
                                        </span>
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xxl-6 col-lg-6 col-md-6 col-12 custom-col-7">
                                <div className="accordian-right-full-sec">
                                  <div className="left-section">
                                    <div className="key-value-se">
                                      <span className="key-sec">Priority</span>
                                      <span className="value-sec">
                                        &nbsp;:&nbsp;
                                        {item.orderPriority ? (
                                          <span className="status-btn heigh-bg">
                                            {item.orderPriority}
                                          </span>
                                        ) : (
                                          "NA"
                                        )}
                                      </span>
                                    </div>
                                    <div className="key-value-se">
                                      <span className="key-sec">Req-Date</span>
                                      <span className="value-sec">
                                        &nbsp;:&nbsp;{" "}
                                        {item.requestDate
                                          ? formatDate(
                                              item.requestDate,
                                              "MM/DD/YYYY hh:mm A"
                                            )
                                          : "N/A"}
                                      </span>
                                    </div>
                                    <div className="key-value-se">
                                      <span className="key-sec">
                                        Promise Date
                                      </span>
                                      <span className="value-sec">
                                        &nbsp;:&nbsp;{" "}
                                        {item.promiseDate
                                          ? formatDate(
                                              item.promiseDate,
                                              "MM/DD/YYYY hh:mm A"
                                            )
                                          : "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="right-action-section">
                                    <div className="file-actions">
                                      <div
                                        className="btn-part pdf-view cursor-pointer"
                                        onClick={() =>
                                          handleEdit(item.orderItemId)
                                        }
                                      >
                                        <Iconify
                                          icon="wpf:edit"
                                          className="swap-icon"
                                        />
                                      </div>
                                      <div className="btn-part dollar-view cursor-pointer">
                                        <Iconify
                                          icon="mingcute:refund-dollar-line"
                                          className="swap-icon"
                                        />
                                      </div>
                                      <div
                                        className="btn-part delete-icon cursor-pointer"
                                        onClick={() =>
                                          handleDeleteClick(item.orderItemId)
                                        }
                                      >
                                        <Iconify
                                          icon="mi:delete"
                                          className="swap-icon"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    })}
                  </>
                ) : (
                  <NoRecordFound />
                )}
              </Accordion>
            ) : (
              <DataLoader />
            )}
          </div>
        </CardSection>
      </div>
      <UpdateOrderItem
        orderItemref={orderItemref}
        getOrderItemList={getOrderItemList}
        orderId={orderId}
      />
    </div>
  );
};

export default OrderItemList;
