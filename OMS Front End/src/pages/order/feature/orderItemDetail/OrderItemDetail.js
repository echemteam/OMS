import React, { useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import {
  orderItemDetailData,
  orderItemList,
  orderItemSelectList,
  orderItemPriceList,
} from "./config/OrderItemDetail.data";
import { AppIcons } from "../../../../data/appIcons";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";
import MolGrid from "../../../../components/Grid/MolGrid";
import CardSection from "../../../../components/ui/card/CardSection";
import Image from "../../../../components/image/Image";
import Checkbox from "../../../../components/ui/inputs/checkBox/CheckBox";

const OrderItemDetail = () => {
  const molGridRef = useRef();
  const orderItemDetail = useRef();
  const [formData, setFormData] = useState(orderItemDetailData);
  const [showModal, setShowModal] = useState(false);

  const handleToggleCenterModal = () => {
    setShowModal(!showModal);
  };

  const handleInputGroupButton = () => {
    handleToggleCenterModal();
  };

  return (
    <div className="row">
      <div className="col-6">
        <FormCreator
          config={formData}
          ref={orderItemDetail}
          {...formData}
          handleInputGroupButton={handleInputGroupButton}
        />
      </div>
      <div className="col-6">
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
      </div>
      <CardSection cardTitle="Order Item Details">
        <MolGrid
          ref={molGridRef}
          configuration={orderItemPriceList}
          allowPagination={false}
        />
      </CardSection>
      <div className="col-12 mt-3">
        <CardSection cardTitle="Order Item List">
          <div className="col-md-12 table-striped p-0 mb-3">
            <MolGrid
              ref={molGridRef}
              configuration={orderItemList}
              allowPagination={false}
            />
          </div>
        </CardSection>
      </div>
      <CenterModel
        showModal={showModal}
        handleToggleModal={handleToggleCenterModal}
        modalTitle="Product Details"
        modelSizeClass="w-60"
      >
        <MolGrid
          ref={molGridRef}
          configuration={orderItemSelectList}
          allowPagination={false}
        />
      </CenterModel>
    </div>
  );
};

export default OrderItemDetail;
