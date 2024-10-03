import React, { useState } from "react";
import "../Order.scss";
import CardSection from "../../../components/ui/card/CardSection";
import Iconify from "../../../components/ui/iconify/Iconify";
import Image from "../../../components/image/Image";
import { AppIcons } from "../../../data/appIcons";
import { Accordion } from "react-bootstrap";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import OrderSummary from "./feature/ordersummary/OrderSummary";
import OrderInformation from "./feature/orderinformation/OrderInformation";
import OrderDocument from "./feature/orderdocument/OrderDocument";
import OrderAction from "./feature/orderaction/OrderAction";
import OrderItemList from "./feature/orderitemlist/OrderItemList";
const OrderDetails = () => {
  return (
    <div className="order-review-section">
      <div className="row">
        {/* Left Side Section Start */}
        <div className="col-xxl-5 col-lg-5 col-md-5 col-12">
          {/* Order Summery Start */}
          <OrderSummary />
          {/* Order Summery End */}

          {/* Order Information Start */}
          <OrderInformation />
          {/* Order Information End */}

          {/* Order Document Start */}
          <OrderDocument />
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
