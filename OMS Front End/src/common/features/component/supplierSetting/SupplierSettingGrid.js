import React, { useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import FormCreator from "../../../../components/Forms/FormCreator";
import { financialSettingFormData } from "./config/FinancialSettingForm.data";
import ACHWireDetail from "./feature/ACHWireDetail";
import RenderTabs from "../../../../components/ui/tabs/RenderTabs";
import CreditCardDetail from "./feature/CreditCardDetail";
import Buttons from "../../../../components/ui/button/Buttons";
import CheckDetail from "./feature/CheckDetail";
import OtherDetail from "./feature/OtherDetail";

const SupplierSettingGrid = () => {
  const financialSettingFormRef = useRef();
  const [financialSettingForm, setfinancialSettingForm] = useState(
    financialSettingFormData
  );
  const tabs = [
    {
      sMenuItemCaption: "ACH/Wire",
      component: (
        <div className="mt-2">
          <ACHWireDetail/>
        </div>
      ),
    },
    {
      sMenuItemCaption: "Credit Card (CC)",
      component: (
        <div className="mt-2">
          <CreditCardDetail />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Check",
      component: (
        <div className="mt-2">
          <CheckDetail />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Other",
      component: (
        <div className="mt-2">
          <OtherDetail />
        </div>
      ),
    },
  ];

  return (
    <div className="address-main-card-sec">
      <div className="mb-2">
        <CardSection>
          <div className="row">
            <FormCreator
              config={financialSettingForm}
              ref={financialSettingFormRef}
              {...financialSettingForm}
              // key={shouldRerenderFormCreatorLogo}
            />
          </div>
        </CardSection>
      </div>
      <div className="payment-method-sec">
        <CardSection cardTitle="Payment Method">
          <div className="vertical-tab-inner">
            <RenderTabs tabs={tabs} isCollapse={true} />
          </div>
          <div className="col-md-12">
            <div className="d-flex align-item-end justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Save"
                // onClick={handleAddEdit}
                // isLoading={isAddLoading || isUpdateLoading}
                // isDisable={isButtonDisable}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                // onClick={onSidebarClose}
              />
            </div>
          </div>
        </CardSection>
      </div>
    </div>
  );
};

export default SupplierSettingGrid;
