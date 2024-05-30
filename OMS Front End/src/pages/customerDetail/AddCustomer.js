import React from "react";
import "./ViewCustomer.scss";
import RenderTabs from "../../components/ui/tabs/RenderTabs";
import BasicDetail from "./features/basicDetail/BasicDetail";
import ContactDetail from "./features/contactDetail/ContactDetail";
import AddressDetail from "./features/addressDetail/AddressDetail";
import CardSection from "../../components/ui/card/CardSection";

const AddCustomer = () => {
  const tabs = [
    {
      sMenuItemCaption: "Basic Details",
      component: (
        <>
          <BasicDetail />
        </>
      ),
    },
    {
      sMenuItemCaption: "Address Details",
      component: (
        <>
          <AddressDetail />
        </>
      ),
    },
    {
      sMenuItemCaption: "Contact Details",
      component: (
        <>
          <ContactDetail />
        </>
      ),
    },
    {
      sMenuItemCaption: "Attachments",
      component: <>Attachment</>,
    },
  ];

  return (
    <div className="card-bottom-m-0">
      <div className="row">
        <div className="col-12 other-info-tab">
          <CardSection cardTitle="Other Information">
            <RenderTabs tabs={tabs} />
          </CardSection>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
