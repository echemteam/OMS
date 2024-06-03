import React from "react";
import "./ViewCustomer.scss";
import RenderTabs from "../../components/ui/tabs/RenderTabs";
import BasicDetail from "./features/basicDetail/BasicDetail";
import ContactDetail from "./features/contactDetail/ContactDetail";
import AddressDetail from "./features/addressDetail/AddressDetail";
import CardSection from "../../components/ui/card/CardSection";
import CustomerDetails from "./features/basicDetail/CustomerDetails";
import { AppIcons } from "../../data/appIcons";

const ViewCustomer = () => {
  const tabs = [
    {
      sMenuItemCaption: "Address",
      component: (
        <div className="mt-2">
          <AddressDetail />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Contact",
      component: (
        <div className="mt-2">
          <ContactDetail />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Settings",
      component: <div className="mt-2">Settings</div>,
    },
    {
      sMenuItemCaption: "Documents",
      component: <div className="mt-2">Documents</div>,
    },
  ];

  return (
    <div className="card-bottom-m-0">
      <div className="row">
        <div className="col-xl-3 col-md-3 col-12 basic-left-part">
          <CardSection>
            <CustomerDetails />
          </CardSection>
        </div>
        <div className="col-xl-9 col-md-9 col-12 other-info-tab">
          <CardSection
            cardTitle="Other Information"
            // buttonClassName="theme-button"
            // rightButton={true}
            // buttonText="Save"
            // titleButtonClick={onEditAction}
          >
            <RenderTabs tabs={tabs} />
          </CardSection>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
