import React, { useRef, useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import {
  AccountGridConfig,
  OurAccountGridConfig,
  addEditCarrierFormData,
  addEditDeliveryFormData,
  collectAccountData,
  ourAccountData,
  shippingFormData,
} from "../config/SettingData";
import Buttons from "../../../../../components/ui/button/Buttons";
import MolGrid from "../../../../../components/Grid/MolGrid";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";

const ShippingSettings = () => {
  const shippingFormRef = useRef();
  const addEditCarrierFormRef = useRef();
  const addEditDeliveryFormRef = useRef();
  const customerGridRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showModalCharges, setShowChargesModal] = useState(false);
  // const [shouldRerenderFormCreator, setShouldRerenderFormCreator] =
  //   useState(false);
  const [customerShippingFormData, setCustomerShippingFormData] =
    useState(shippingFormData);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleToggleOurAccountModal = () => {
    setShowChargesModal(!showModalCharges);
  };
  const actionHandler = {
    EDIT: handleToggleModal,
  };
  const ourAccountactionHandler = {
    EDIT: handleToggleOurAccountModal,
  };

  return (
    <>
      <div className="row horizontal-form">
        <FormCreator
          config={shippingFormData}
          ref={shippingFormRef}
          // key={shouldRerenderFormCreator}
          {...customerShippingFormData}
          // onFormDataUpdate={handleFormDataChange}
        />

        <div className="grid-section">
          <div className="account-table table-striped mb-3">
            <MolGrid
              ref={customerGridRef}
              configuration={AccountGridConfig}
              dataSource={collectAccountData}
              allowPagination={false}
              onActionChange={actionHandler}
            />
          </div>
          <div className="account-table our-account-table table-striped">
            <MolGrid
              ref={customerGridRef}
              configuration={OurAccountGridConfig}
              dataSource={ourAccountData}
              allowPagination={false}
              onActionChange={ourAccountactionHandler}
            />
          </div>
        </div>
      </div>
      {/* Model 1 Start */}
      <CenterModel
        showModal={showModal}
        handleToggleModal={handleToggleModal}
        modalTitle="Add/Edit Carrier"
        modelSizeClass="w-30"
      >
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <FormCreator
                config={addEditCarrierFormData}
                ref={addEditCarrierFormRef}
                // key={shouldRerenderFormCreator}
                {...customerShippingFormData}
                // onFormDataUpdate={handleFormDataChange}
              />
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="d-flex align-item-end justify-content-end">
              <div className="d-flex align-item-end">
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText="Save"
                  // onClick={onhandleEdit}
                  // isLoading={isAddEditCustomerSettingsLoading}
                />
                <Buttons
                  buttonTypeClassName="dark-btn ml-5"
                  buttonText="Cancel"
                  onClick={handleToggleModal}
                />
              </div>
            </div>
          </div>
        </div>
      </CenterModel>
      {/* Model 1 End */}

      {/* Model 2 Start */}
      <CenterModel
        showModal={showModalCharges}
        handleToggleModal={handleToggleOurAccountModal}
        modalTitle="Add/Edit Charges"
        modelSizeClass="w-30"
      >
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <FormCreator
                config={addEditDeliveryFormData}
                ref={addEditDeliveryFormRef}
                // key={shouldRerenderFormCreator}
                {...customerShippingFormData}
                // onFormDataUpdate={handleFormDataChange}
              />
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="d-flex align-item-end justify-content-end">
              <div className="d-flex align-item-end">
                <Buttons
                  buttonTypeClassName="theme-button"
                  buttonText="Save"
                  // onClick={onhandleEdit}
                  // isLoading={isAddEditCustomerSettingsLoading}
                />
                <Buttons
                  buttonTypeClassName="dark-btn ml-5"
                  buttonText="Cancel"
                  onClick={handleToggleOurAccountModal}
                />
              </div>
            </div>
          </div>
        </div>
      </CenterModel>
      {/* Model 2 End */}
    </>
  );
};

export default ShippingSettings;
