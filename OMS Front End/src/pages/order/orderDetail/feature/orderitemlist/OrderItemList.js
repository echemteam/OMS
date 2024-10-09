import React, { useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import { useDeleteOrderItemMutation, useLazyGetOrderItemsByOrderIdQuery } from "../../../../../app/services/orderAPI";
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

const OrderItemList = ({ orderDetails, handleOrderItemShippingAddress }) => {

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

  const [deleteOrderItem, { isSuccess: isDeleteOrderItemSuccess, data: isDeleteOrderItemData }] = useDeleteOrderItemMutation();
  const [getOrderItemsByOrderId, { isFetching: isGetOrderItemsByOrderIdFetching, isSuccess: isGetOrderItemsByOrderIdSuccess, data: isGetOrderItemsByOrderIdData }] = useLazyGetOrderItemsByOrderIdQuery();

  useEffect(() => {
    getOrderItemList();
  }, [orderId]);

  const getOrderItemList = () => {
    orderId && getOrderItemsByOrderId(orderId);
  }

  useEffect(() => {
    if (!isGetOrderItemsByOrderIdFetching && isGetOrderItemsByOrderIdSuccess && isGetOrderItemsByOrderIdData) {
      setItemList(isGetOrderItemsByOrderIdData);
    }
  }, [isGetOrderItemsByOrderIdFetching, isGetOrderItemsByOrderIdSuccess, isGetOrderItemsByOrderIdData])

  useEffect(() => {
    if (isDeleteOrderItemSuccess && isDeleteOrderItemData) {
      ToastService.success(isDeleteOrderItemData.errorMessage);
      onGetData();
    }
  }, [isDeleteOrderItemSuccess, isDeleteOrderItemData]);

  const handleDeleteClick = (orderItemId) => {
    confirm("Delete?",
      "Are you sure you want to Delete?",
      "Delete", "Cancel"
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
  }

  const onGetData = () => {
    getOrderItemsByOrderId(orderId);
  };
  // const data = [
  //   {
  //     eventKey: "0",
  //     id: "Y-2520",
  //     casNumber: "19679-75-5",
  //     price: "$51.75",
  //     quantity: "2 x 50MG",
  //     totalCost: "1X$20",
  //     status: "Complete",
  //     statusClass: "complete-bg",
  //     name: "2-amino-3 5-dibromobenzaldehyde",
  //     mdlNumber: "12002452003584",
  //     shippingAddress: "2-amino-3 5-dibromobenzaldehyde",
  //     priority: "High",
  //     requestDate: "10/28/2024",
  //     promiseDate: "11/15/2024",
  //   },
  //   {
  //     eventKey: "1",
  //     id: "Y-2520",
  //     casNumber: "19679-75-5",
  //     price: "$51.75",
  //     quantity: "2 x 50MG",
  //     totalCost: "1X$20",
  //     status: "Pending",
  //     statusClass: "pending-bg",
  //     name: "2-amino-3 5-dibromobenzaldehyde",
  //     mdlNumber: "12002452003584",
  //     shippingAddress: "2-amino-3 5-dibromobenzaldehyde",
  //     priority: "High",
  //     requestDate: "10/28/2024",
  //     promiseDate: "11/15/2024",
  //   },
  //   // Add more data as needed
  // ];
  return (
    <div>
      <div className="order-item-list">
        <CardSection>
          <div className="order-all-item-view">
            <div className="accordian-title">
              <span>Catalog ID</span>
              <span>Cas Number</span>
              <span>Unit</span>
              <span>Pack Size</span>
              <span>Price</span>
              <span>Status</span>
            </div>
          </div>
          <div className="accordian-desc">
            {itemList?.length === 0 ? (
              <NoRecordFound />
            ) : (
              !isGetOrderItemsByOrderIdFetching ?
                <Accordion activeKey={activeKey}>
                  {itemList.map((item, index) => (
                    <Accordion.Item eventKey={item.orderItemId} key={index}>
                      <Accordion.Header
                        onClick={() => handleToggle(item.orderItemId)}
                      >
                        <div className="header-items">
                          <span>{item.catalogId ? item.catalogId : "-"}</span>
                          <span>{item.casNumber ? item.casNumber : "-"}</span>
                          <span>{item.unit ? item.unit : "-"}</span>
                          <span>{item.packSize ? item.packSize : "-"}</span>
                          <span>{item.itemUnitPrice ? `$${item.itemUnitPrice}` : "-"}</span>

                          <span>
                            <div className={`status-btn ${item.statusClass}`}>
                              {item.itemStatus}
                            </div>
                          </span>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          <div className="col-xxl-6 col-lg-6 col-md-6 col-12 custom-col-5">
                            <div className="key-value-se align-items-start">
                              <span className="key-sec">Name</span>&nbsp;:&nbsp;
                              <span className="value-sec">{item.chemicalName ? item.chemicalName : "NA"}</span>
                            </div>
                            <div className="key-value-se">
                              <span className="key-sec">MDL Number </span>
                              <span className="value-sec">
                                &nbsp;:&nbsp; {item.mdlNumber ? item.mdlNumber : "NA"}
                              </span>
                            </div>
                            <div className="key-value-se">
                              <span className="key-sec">Shipping Add.</span>
                              <div className="value-right-btn">
                                <span className="value-sec add-value">
                                  &nbsp;:&nbsp; {item.orderShippingAddress}
                                </span>
                                <span className="right-btn">
                                  <span className="info-btn hover-model">
                                    <Iconify icon="ep:info-filled" className="swap-icon" />
                                    <span className="address-card">
                                      <ShippingAddressDetailsModel orderItemShippingInfo={item?.orderShippingAddress} orderDetails={orderDetails}
                                        handleOrderItemShippingAddress={handleOrderItemShippingAddress} />
                                    </span>
                                  </span>
                                  <span className="info-btn tooltip-div" onClick={() => handleOrderItemShippingAddress("Shipping", item?.orderItemId)}>
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
                            <div className="key-value-se">
                              <span className="key-sec">Order Notes</span>
                              <div className="value-right-btn">
                                <span className="value-sec add-value">
                                  &nbsp;:&nbsp; {item.shippingAddress}
                                </span>
                                <span className="right-btn">
                                  <span className="info-btn hover-model">
                                    <Iconify
                                      icon="ep:info-filled"
                                      className="swap-icon"
                                    />
                                    <span className="note-card">
                                      <OrderNoteDetailsModel orderNote={item?.orderNote} />
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
                                    &nbsp;:&nbsp;{item.orderPriority ?
                                      <span className="status-btn heigh-bg">
                                        {item.orderPriority}
                                      </span>
                                      : "NA"}
                                  </span>
                                </div>
                                <div className="key-value-se">
                                  <span className="key-sec">Req-Date</span>
                                  <span className="value-sec">
                                    &nbsp;:&nbsp; {item.requestDate ? formatDate(item.requestDate, "MM/DD/YYYY hh:mm A") : "NA"}
                                  </span>
                                </div>
                                <div className="key-value-se">
                                  <span className="key-sec">Promise Date</span>
                                  <span className="value-sec">
                                    &nbsp;:&nbsp;  {item.promiseDate ? formatDate(item.promiseDate, "MM/DD/YYYY hh:mm A") : "NA"}
                                  </span>
                                </div>
                              </div>
                              <div className="right-action-section">
                                <div className="file-actions">
                                  <div className="btn-part pdf-view cursor-pointer" onClick={() => handleEdit(item.orderItemId)}>
                                    <Iconify icon="wpf:edit" className="swap-icon" />
                                  </div>
                                  <div className="btn-part dollar-view cursor-pointer">
                                    <Iconify
                                      icon="mingcute:refund-dollar-line"
                                      className="swap-icon"
                                    />
                                  </div>
                                  <div className="btn-part delete-icon cursor-pointer" onClick={() => handleDeleteClick(item.orderItemId)}>
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
                  ))}
                </Accordion>
                : <DataLoader />
            )}
          </div>
        </CardSection>
      </div>
      <UpdateOrderItem orderItemref={orderItemref} getOrderItemList={getOrderItemList} orderId={orderId} />
    </div>
  );
};

export default OrderItemList;
