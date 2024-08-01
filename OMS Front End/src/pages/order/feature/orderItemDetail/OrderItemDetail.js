import React, { useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import {
  orderItemDetailData,
  orderItemList,
  orderItemSelectList,
} from "./config/OrderItemDetail.data";
import { AppIcons } from "../../../../data/appIcons";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import Buttons from "../../../../components/ui/button/Buttons";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";
import MolGrid from "../../../../components/Grid/MolGrid";
import AddOrderItem from "./features/AddOrderItem";
import CardSection from "../../../../components/ui/card/CardSection";

const OrderItemDetail = () => {
  const molGridRef = useRef();
  const orderItemDetail = useRef();
  const [formData, setFormData] = useState(orderItemDetailData);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToggleSidebarModal = () => {
    setIsModelOpen(true);
  };

  const handleToggleCenterModal = () => {
    setShowModal(!showModal);
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
  };

  const handleInputGroupButton = () => {
    handleToggleCenterModal();
  };

  return (
    <>
      <div className="row">
        <div className="col-6">
          <FormCreator
            config={formData}
            ref={orderItemDetail}
            {...formData}
            handleInputGroupButton={handleInputGroupButton}
          />
        </div>
        <div className="col-12">
          <CardSection cardTitle="Order Item List">
            <div className="col-md-12 table-striped p-0">
              <MolGrid
                ref={molGridRef}
                configuration={orderItemList}
                allowPagination={false}
              />
            </div>
          </CardSection>
        </div>
        <Buttons
          buttonTypeClassName="theme-button"
          buttonText="Add"
          onClick={handleToggleSidebarModal}
        />
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
        <SidebarModel
          modalTitle="Order Items"
          contentClass="content-50"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <AddOrderItem />
        </SidebarModel>
      </div>
    </>
  );
};

export default OrderItemDetail;
