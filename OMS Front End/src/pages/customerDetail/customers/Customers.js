import React, { useRef } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import { AppIcons } from "../../../data/appIcons";
import MolGrid from "../../../components/Grid/MolGrid";
import { CustomerGridConfig, customerData } from "./config/CustomerData";
import RenderTabs from "../../../components/ui/tabs/RenderTabs";

const Customers = () => {
  const customerGridRef = useRef();
  const tabs = [
    {
      sMenuItemCaption: "Address",
      component: (
        <div className="mt-2">
         Tab1
        </div>
      ),
    },
    {
      sMenuItemCaption: "Contact",
      component: (
        <div className="mt-2">
          Tab1
        </div>
      ),
    },
    
  ];
  const actionHandler = {
    // EDIT: handleToggleModal,
  };
  const contactActionHandler = {
    // EDIT: handleToggleModalContact,
  };
  return (
    <>
      <div className="container-fluid">
        <div className="card-bottom-m-0">
          <div className="row">
            <div className="col-xxl-3 col-xl-4 col-md-3 col-12 basic-left-part customer-desc-left-sec">
              <CardSection>
                
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
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 col-12">
            <CardSection
              cardTitle="Customer Details"
              rightButton={true}
              buttonClassName="theme-button"
              buttonText="Add"
              textWithIcon={true}
              iconImg={AppIcons.PlusIcon}
              titleButtonClick=""
            >
              <div className="row">
                <div className="col-md-12 table-striped">
                  <MolGrid
                    ref={customerGridRef}
                    configuration={CustomerGridConfig}
                    dataSource={customerData}
                    allowPagination={false}
                    onActionChange={actionHandler}
                  />
                </div>
              </div>
            </CardSection>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
