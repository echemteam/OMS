import React, { useRef, useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import {
  ShippingGridConfig,
  collectAccountData,
  shippingFormData,
} from "../config/SettingData";
import Buttons from "../../../../../components/ui/button/Buttons";
import MolGrid from "../../../../../components/Grid/MolGrid";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../../data/appIcons";

const ShippingSettings = () => {
  const shippingFormRef = useRef();
  const [isModelOpen, setisModelOpen] = useState(false);
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] =
    useState(false);
  const [customerShippingFormData, setCustomerShippingFormData] =
    useState(shippingFormData);
  const customerGridRef = useRef();
  const handleUserCarrier = (data) => {
    setisModelOpen(true);
  };
  const actionHandler = {
    EDIT: handleUserCarrier,
  };
  const onSidebarClose = () => {
    setisModelOpen(false);
  };
  return (
    <>
      <div className="row horizontal-form">
        <FormCreator
          config={shippingFormData}
          ref={shippingFormRef}
          key={shouldRerenderFormCreator}
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
              />
            </div>
          </div>
        </div>
      </div>
      <SidebarModel
        modalTitle="Assign Users"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        
      </SidebarModel>
    </>
  );
};

export default ShippingSettings;
