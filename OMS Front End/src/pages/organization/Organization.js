import React, { useState } from "react";
import CardSection from "../../components/ui/card/CardSection";
import RenderTabs from "../../components/ui/tabs/RenderTabs";
import { AppIcons } from "../../data/appIcons";
import Image from "../../components/image/Image";
const OrganizationBusinessAddressDetail = React.lazy(() =>
  import(
    "./feature/organizationBusinessAddressDetail/OrganizationBusinessAddressDetail"
  )
);
const OrganizationOtherChargesDetail = React.lazy(() =>
  import(
    "./feature/organizationOtherChargesDetail/OrganizationOtherChargesDetail"
  )
);
const OrganizationShippingChargesDetail = React.lazy(() =>
  import(
    "./feature/organizationShippingCharges/OrganizationShippingChargesDetail"
  )
);
const OrganizationAccountingDetail = React.lazy(() =>
  import("./feature/organizationAccountingDetail/OrganizationAccountingDetail")
);
const OrganizationLogisticDetail = React.lazy(() =>
  import("./feature/organizationLogisticDetail/OrganizationLogisticDetail")
);
const OrganizationBankDetail = React.lazy(() =>
  import("./feature/organizationBankDetail/OrganizationBankDetail")
);
const OrganizationHistory = React.lazy(() =>
  import("./feature/organizationHistory/OrganizationHistory")
);
const OrganizationContactDetail = React.lazy(() =>
  import("./feature/organizationContactDetail/OrganizationContactDetail")
);
const SMTPSettings = React.lazy(() =>
  import("./feature/smtpSettings/SMTPSettings")
);
const OrganizationProfileManagement = React.lazy(() =>
  import(
    "./feature/organizationProfileManagement/OrganizationProfileManagement"
  )
);

const Organization = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [companyName, setCompanyName] = useState();
  const handleActiveTab = (id) => {
    setActiveTabId(id);
  };

  const tabs = [
    {
      sMenuItemCaption: "Organization Profile",
      component: (
        <div className="mt-2">
          <OrganizationProfileManagement setCompanyName={setCompanyName} />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Business Address",
      component: (
        <div className="mt-2">
          <OrganizationBusinessAddressDetail />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Contact Details",
      component: (
        <div className="mt-2">
          <OrganizationContactDetail />
        </div>
      ),
    },

    {
      sMenuItemCaption: "Logistic Details",
      component: (
        <div className="mt-2">
          <OrganizationLogisticDetail />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Bank Details",
      component: (
        <div className="mt-2">
          <OrganizationBankDetail />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Accounting Details",
      component: (
        <div className="mt-2">
          <OrganizationAccountingDetail />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Shipping Charges",
      component: (
        <div className="mt-2">
          <OrganizationShippingChargesDetail />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Other Charges",
      component: (
        <div className="mt-2">
          <OrganizationOtherChargesDetail />
        </div>
      ),
    },
    // organizationId > 0 &&
    {
      sMenuItemCaption: "SMTP Settings",
      component: (
        <div className="mt-2">
          <SMTPSettings />
        </div>
      ),
    },
    {
      sMenuItemCaption: "History",
      component: (
        <div className="mt-2 organiazation-history">
          <OrganizationHistory />
        </div>
      ),
    },
  ];

  return (
    <div className="vertical-tab-card organization">
      <div className="row">
        <div className="col-xxl-12 col-xl-12 col-md-12 col-12">
          <CardSection>
       
        
              <h1 className="organization-main-title ">
                Organization Name
                {
                 companyName ?
                <div className="company-title">
                  <div className="company-image">
                    <Image
                      imagePath={AppIcons.CompanyIcon}
                      altText="Company-icon"
                    />
                  </div>
                  <span>{companyName}</span>
                </div>
                : null
              }
              </h1>
            <div className="main-organiazation-history">
              <div className="vertical-tab-inner">
                <RenderTabs
                  tabs={tabs}
                  isCollapse={true}
                  onActiveTab={handleActiveTab}
                  isOrganization={true}
                />
              </div>
            </div>
          </CardSection>
        </div>
      </div>
    </div>
  );
};

export default Organization;
