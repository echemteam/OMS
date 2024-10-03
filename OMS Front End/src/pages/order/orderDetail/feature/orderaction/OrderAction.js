import React from "react";
import CardSection from "../../../../../components/ui/card/CardSection";

const OrderAction = () => {
  return (
    <div>
      <div className="order-action-sec">
        <CardSection
          cardTitle="Order Items"
          rightButton={true}
          buttonClassName="outline-theme-btn"
          isIcon={true}
          iconClass="iconamoon:history-bold"
          multipleButton={true}
          isTooltip={true}
          tootipText="History"
          rightButtonArray={[
            {
              isIcon: true,
              buttonTypeClassName: "outline-theme-btn",
              iconClass: "fluent-mdl2:activate-orders",
              isTooltip: true,
              tootipText: "Original PO",
            },
            {
              isIcon: true,
              buttonTypeClassName: "outline-theme-btn",
              iconClass: "icon-park-outline:transaction-order",
              isTooltip: true,
              tootipText: "Price List",
            },
            {
              isIcon: true,
              buttonTypeClassName: "outline-theme-btn",
              iconClass: "fluent-mdl2:chart",
              isTooltip: true,
              tootipText: "Order Status",
            },
          ]}
        ></CardSection>
      </div>
    </div>
  );
};

export default OrderAction;
