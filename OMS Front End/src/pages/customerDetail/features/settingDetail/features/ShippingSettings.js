import React, { useRef, useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import {
  ShippingGridConfig,
  addEditCarrierFormData,
  collectAccountData,
  shippingFormData,
} from "../config/SettingData";
import Buttons from "../../../../../components/ui/button/Buttons";
import MolGrid from "../../../../../components/Grid/MolGrid";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";

const ShippingSettings = () => {
  const shippingFormRef = useRef();
  const addEditCarrierFormRef = useRef();

  const customerGridRef = useRef();
  const [showModal, setShowModal] = useState(false);

  // const [shouldRerenderFormCreator, setShouldRerenderFormCreator] =
  //   useState(false);
  const [customerShippingFormData, setCustomerShippingFormData] =
    useState(shippingFormData);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const actionHandler = {
    EDIT: handleToggleModal,
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
          <div className="collect-account table-striped">
            <MolGrid
              ref={customerGridRef}
              configuration={ShippingGridConfig}
              dataSource={collectAccountData}
              allowPagination={false}
              onActionChange={actionHandler}
            />
          </div>
        </div>
      </div>
      <CenterModel
        showModal={showModal}
        handleToggleModal={handleToggleModal}
        modalTitle="Add/Edit Delivery methods"
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
          <div className="col-md-12 mt-4">
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
    </>
  );
};

export default ShippingSettings;
