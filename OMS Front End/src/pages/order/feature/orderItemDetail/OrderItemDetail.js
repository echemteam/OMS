import React, { useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import { orderItemDetailData } from "./config/OrderItemDetail.data";
import Image from "../../../../components/image/Image";
import { AppIcons } from "../../../../data/appIcons";
import Checkbox from "../../../../components/ui/inputs/checkBox/CheckBox";

const OrderItemDetail = () => {
  const orderItemDetail = useRef();
  const [formData, setFormData] = useState(orderItemDetailData);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="row">
          <FormCreator config={formData} ref={orderItemDetail} {...formData} />
          </div>
        </div>
        <div className="col-6">
          <div className="verify-product-label">Verify Product Details</div>
          <div className="verify-product-details">
            <div className="detail-row">
              <span className="detail-label">Catalog ID</span>
              <span className="detail-value">B-5015</span>
              <span className="detail-action"></span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Chemical Name</span>
              <span className="detail-value">2-Amino-3-fluorobenzoic acid</span>
              <span className="detail-action">
                <button className="edit-button">
                  <Image imagePath={AppIcons.editThemeIcon} />
                </button>
                <div className="checkbox">
                  <Checkbox />
                </div>
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">CAS Number</span>
              <span className="detail-value">825-22-9</span>
              <span className="detail-action">
                <button className="edit-button">
                  <Image imagePath={AppIcons.editThemeIcon} />
                </button>
                <div className="checkbox">
                  <Checkbox />
                </div>
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">MDL Number</span>
              <span className="detail-value">MFCD01569395</span>
              <span className="detail-action">
                <button className="edit-button">
                  <Image imagePath={AppIcons.editThemeIcon} />
                </button>
                <div className="checkbox">
                  <Checkbox />
                </div>
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default OrderItemDetail;
