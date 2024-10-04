/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/** Common Services & Data files */
import { decryptUrlData } from "../../../services/CryptoService";

/** RTK Query */
import { useLazyGetOrderDetailByOrderIdQuery } from "../../../app/services/orderAPI";

/** CSS Files */
import "../Order.scss";

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
  const orderId = id ? decryptUrlData(id) : 0;

  const [orderDetails, setOrderDetails] = useState();

  const [
    getOrderDetailByOrderId,
    {
      isFetching: isOrderDetailsFetching,
      isSuccess: isOrderDetailsFetched,
      data: orderByOrderIdDetails,
    },
  ] = useLazyGetOrderDetailByOrderIdQuery();

  useEffect(() => {
    if (orderId) {
      getOrderDetailByOrderId(orderId);
    }
  }, [orderId]);

  useEffect(() => {
    if (
      !isOrderDetailsFetching &&
      isOrderDetailsFetched &&
      orderByOrderIdDetails
    ) {
      setOrderDetails(orderByOrderIdDetails);
    }
  }, [isOrderDetailsFetching, isOrderDetailsFetched, orderByOrderIdDetails]);

  return (
    <div className="order-review-section">
      <div className="row">
        {/* Left Side Section Start */}
        <div className="col-xxl-5 col-lg-5 col-md-5 col-12">
          {/* Order Summery Start */}
          <OrderSummary orderDetails={orderDetails} />
          {/* Order Summery End */}

          {/* Order Information Start */}
          <OrderInformation orderDetails={orderDetails} />
          {/* Order Information End */}

          {/* Order Document Start */}
          <OrderDocument orderDetails={orderDetails} />
          {/* Order Document End */}
        </div>
        {/* Left Side Section End */}

        {/* Right Side Section Start */}
        <div className="col-xxl-7 col-lg-7 col-md-7 col-12">
          <OrderAction />
          <OrderItemList />
        </div>
        {/* Right Side Section End */}
      </div>
    </div>
  );
};

export default OrderDetails;
