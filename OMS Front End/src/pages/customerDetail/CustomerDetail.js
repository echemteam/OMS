import React from "react";
import "./CustomerDetail.scss";
import RenderTabs from "../../components/ui/tabs/RenderTabs";
import BasicDetail from "./features/basicDetail/BasicDetail";
import ContactDetail from "./features/contactDetail/ContactDetail";
import AddressDetail from "./features/addressDetail/AddressDetail";
import CardSection from "../../components/ui/card/CardSection";

const CustomerDetail = () => {
  const tabs = [
    
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
      component: (
        <>
          Attachment
        </>
      ),
    },
  ];

  return (
    <div className="card-bottom-m-0">
      <div className="row">
        <div className="col-xl-3 col-md-3 col-12 basic-left-part">
          <CardSection
            cardTitle="Basic Information"
            // buttonClassName="theme-button"
            // rightButton={true}
            // buttonText="Save"
            // titleButtonClick={onEditAction}
          >
            <BasicDetail />
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

export default CustomerDetail;
