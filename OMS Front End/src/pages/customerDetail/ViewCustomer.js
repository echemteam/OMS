import React, { useState } from "react";
import "./ViewCustomer.scss";
import RenderTabs from "../../components/ui/tabs/RenderTabs";
import BasicDetail from "./features/basicDetail/BasicDetail";
import ContactDetail from "./features/contactDetail/ContactDetail";
import AddressDetail from "./features/addressDetail/AddressDetail";
import CardSection from "../../components/ui/card/CardSection";
import CustomerDetails from "./features/basicDetail/CustomerDetails";
import { AppIcons } from "../../data/appIcons";
import SidebarModel from "../../components/ui/sidebarModel/SidebarModel";
import Buttons from "../../components/ui/button/Buttons";
import SettingDetails from "./features/settingDetail/SettingDetails";
import DocumentDetails from "./features/documentsDetail/DocumentDetails";

const ViewCustomer = () => {
  const [isModelOpen, setisModelOpen] = useState(false);
  const handleToggleModal = () => {
    setisModelOpen(true);
  };
  const onSidebarClose = () => {
    setisModelOpen(false);
  };
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
      component: (
        <div className="mt-2">
          <SettingDetails />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Documents",
      component: (
        <div className="mt-2">
          <DocumentDetails />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="card-bottom-m-0">
        <div className="row">
          <div className="col-xxl-3 col-xl-4 col-md-3 col-12 basic-left-part customer-desc-left-sec">
            <CardSection>
              <CustomerDetails editClick={handleToggleModal} />
            </CardSection>
          </div>
          <div className="col-xxl-9 col-xl-8 col-md-9 col-12 other-info-tab">
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
      <SidebarModel
        modalTitle="Edit Basic Information"
        contentClass="content-65 basic-info-model"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <BasicDetail />
        <div className="col-md-12 mt-3">
          <div className="d-flex align-item-end justify-content-end">
            <div className="d-flex align-item-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Save"
                // onClick={onHandleUser}
                // isLoading={EmailLoading || updateUserLoading}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                onClick={onSidebarClose}
              />
            </div>
          </div>
        </div>
      </SidebarModel>
    </>
  );
};

export default ViewCustomer;
