import React, { useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import FormCreator from "../../../../components/Forms/FormCreator";
import { financialSettingFormData } from "./config/FinancialSettingForm.data";
import ACHWireDetail from "./feature/ACHWireDetail";
import RenderTabs from "../../../../components/ui/tabs/RenderTabs";

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
          <ACHWireDetail></ACHWireDetail>
        </div>
      ),
      
    },
    {
      sMenuItemCaption: "Credit Card (CC)",
      component: (
        <div className="mt-2">
          Credit Card
        </div>
      ),
      
    },
    {
      sMenuItemCaption: "Check",
      component: (
        <div className="mt-2">
          Check
        </div>
      ),
      
    },
    {
      sMenuItemCaption: "Other",
      component: (
        <div className="mt-2">
          Other
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
        </CardSection>
      </div>
    </div>
  );
};

export default SupplierSettingGrid;
