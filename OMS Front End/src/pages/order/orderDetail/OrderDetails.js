/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

/** Common Services & Data files */
import { decryptUrlData } from "../../../services/CryptoService";

/** RTK Query */
import { useLazyGetOrderDetailByOrderIdQuery } from "../../../app/services/orderAPI";

/** CSS Files */
import "../Order.scss";
import PaymentInformation from "./feature/paymentinformation/PaymentInformation";

/** Lazily Loaded Components */
const OrderAction = lazy(() => import("./feature/orderaction/OrderAction"));
const OrderSummary = lazy(() => import("./feature/ordersummary/OrderSummary"));
const OrderItemList = lazy(() =>
  import("./feature/orderitemlist/OrderItemList")
);
const OrderDocument = lazy(() =>
  import("./feature/orderdocument/OrderDocument")
);
const OrderInformation = lazy(() =>
  import("./feature/orderinformation/OrderInformation")
);

const OrderDetails = () => {
  const { id } = useParams();
  const orderItemShippingAddRef = useRef();
  const orderId = id ? decryptUrlData(id) : 0;
  const isUpdateOrderItemShippingAddRef = useRef();
  const [orderDetails, setOrderDetails] = useState();
  const [isOrderItemAddUpdate, setIsOrderItemAddUpdate] = useState(false);

  const [
    getOrderDetailByOrderId,
    {
      isFetching: isOrderDetailsFetching,
      isSuccess: isOrderDetailsFetched,
      data: orderByOrderIdDetails,
    },
  ] = useLazyGetOrderDetailByOrderIdQuery();

  const handleRefreshOrderDetails = () => {
    if (orderId) {
      getOrderDetailByOrderId(orderId);
    }
  };

  useEffect(() => {
    if (orderId) {
      handleRefreshOrderDetails();
    }
  }, [orderId]);

  useEffect(() => {
    if (
      !isOrderDetailsFetching &&
      isOrderDetailsFetched &&
      orderByOrderIdDetails
    ) {
      setOrderDetails(orderByOrderIdDetails);
      // This is used for the Order Item Address Update Then Re-fetch the order items list API.
      if (isOrderItemAddUpdate) {
        isUpdateOrderItemShippingAddRef.current.getOrderItemList();
      }
      setIsOrderItemAddUpdate(false);
    }
  }, [isOrderDetailsFetching, isOrderDetailsFetched, orderByOrderIdDetails]);

  const handleOrderItemShippingAddress = (type, addressId, orderItemId) => {
    if (orderItemShippingAddRef) {
      orderItemShippingAddRef.current.handleToggleModalShippingAddress(
        type,
        addressId,
        orderItemId
      );
      setIsOrderItemAddUpdate(true);
    }
  };

  return (
    <div className="order-review-section">
      <div className="row">
        {/* Left Side Section Start */}
        <div className="col-xxl-5 col-lg-5 col-md-5 col-12">
          {/* Order Summery Start */}
          <OrderSummary
            orderId={orderId}
            isOrderDetailsFetch={isOrderDetailsFetching}
            orderDetails={orderDetails}
            onRefreshOrderDetails={handleRefreshOrderDetails}
          />
          {/* Order Summery End */}

          {/* Order Information Start */}
          <OrderInformation
            orderItemShippingAddRef={orderItemShippingAddRef}
            orderDetails={orderDetails}
            handleRefreshOrderDetails={handleRefreshOrderDetails}
          />
          {/* Order Information End */}

          {/* Order Document Start */}
          <OrderDocument
            orderDetails={orderDetails}
            isOrderDetailsFetching={isOrderDetailsFetching}
            onRefreshOrderDetails={handleRefreshOrderDetails}
          />
          {/* Order Document End */}
        </div>
        {/* Left Side Section End */}

        {/* Right Side Section Start */}
        <div className="col-xxl-7 col-lg-7 col-md-7 col-12">
          <OrderAction orderId={orderId} />
          <OrderItemList
            isUpdateOrderItemShippingAddRef={isUpdateOrderItemShippingAddRef}
            orderDetails={orderDetails}
            handleOrderItemShippingAddress={handleOrderItemShippingAddress}
          />
          <PaymentInformation orderDetails={orderDetails}/>
        </div>
        {/* Right Side Section End */}
      </div>
    </div>
  );
};

export default OrderDetails;
