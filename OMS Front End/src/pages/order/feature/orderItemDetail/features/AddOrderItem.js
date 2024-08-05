import React, { useRef, useState } from "react";
import Image from "../../../../../components/image/Image";
import Checkbox from "../../../../../components/ui/inputs/checkBox/CheckBox";
import { AppIcons } from "../../../../../data/appIcons";
import MolGrid from "../../../../../components/Grid/MolGrid";
import {
  orderItemPriceList,
  orderItemDetailData,
} from "./config/AddOrderItemDetail.data";
import CardSection from "../../../../../components/ui/card/CardSection";
import Label from "../../../../../components/ui/label/Label";
import FormCreator from "../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../components/ui/button/Buttons";

const AddOrderItem = () => {
  const molGridRef = useRef();
  const orderItemDetail = useRef();
  const [formData, setFormData] = useState(orderItemDetailData);

  return (
    <>
      <div className="product-label my-3">
        <span>Product Details :</span>
        <span>2-Amino-3-fluorobenzoic acid</span>
      </div>
      <div className="verify-product-group">
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
      <FormCreator config={formData} ref={orderItemDetail} {...formData} />
      <CardSection cardTitle="Order Item Details">
        <MolGrid
          ref={molGridRef}
          configuration={orderItemPriceList}
          allowPagination={false}
        />
      </CardSection>
      <div className="row">
        <div className="col-md-12 my-3 mt-4">
          <div className="d-flex align-item-end justify-content-end">
            <div className="d-flex align-item-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Save"
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOrderItem;
