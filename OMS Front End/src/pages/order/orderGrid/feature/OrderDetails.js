import React from "react";
import "../../Order.scss";
import CardSection from "../../../../components/ui/card/CardSection";
const OrderDetails = () => {
  return (
    <div className="order-review-section">
      <div className="row">
        <div className="col-xxl-5 col-lg-5 col-md-5 col-12">
          <CardSection
            cardTitle="Order Summary"
            rightButton={true}
            buttonClassName="theme-button"
            isIcon={true}
            iconClass="wpf:edit"
            // titleButtonClick={}
            isCenterTile={true}
            CenterTitleTxt="AA123152"
            CenterBtnIcon="icomoon-free:file-pdf"
            centerBtnTitle="Purchase Order Details"
            // centerBtnOnClick={}
          ></CardSection>
        </div>
        <div className="col-xxl-7 col-lg-7 col-md-7 col-12">
          <CardSection cardTitle="Order Items"></CardSection>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
