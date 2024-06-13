import React, { useEffect, useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { InActiveCustomers } from "./InActiveCustomers";
import CustomerContext from "../../../../utils/ContextAPIs/Customer/CustomerListContext"
import { AllInActiveCustomerGridConfig, BlockedInActiveCustomerGridConfig, DisabledInActiveCustomerGridConfig, FreezedInActiveCustomerGridConfig } from "../config/CustomerData";
import { StatusEnums } from "../../../../common/features/Enums/StatusEnums";

const InActiveCustomer = ({statusId}) => {
  const [activeTab, setActiveTab] = useState("0");
  const DataRef = useRef();

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };

  const getListApi = () => {
    if (DataRef.current) {
      DataRef.current.getListApi();
    }
  };

  useEffect(() => {
    getListApi();
  }, [activeTab]);

  const tabs = [
    {
      sMenuItemCaption: "All",
      component: (
        <div className="mt-2">
          <InActiveCustomers statusId={statusId} configFile={AllInActiveCustomerGridConfig}/>
        </div>
      ),
    },
    {
      sMenuItemCaption: "Freezed",
      component: (
        <div className="mt-2">
          <InActiveCustomers statusId={StatusEnums.Freeze} configFile={FreezedInActiveCustomerGridConfig}/>
        </div>
      ),
    },
    {
      sMenuItemCaption: "Blocked",
      component: (
        <div className="mt-2">
          <InActiveCustomers statusId={StatusEnums.Blocked} configFile={BlockedInActiveCustomerGridConfig}/>
        </div>
      ),
    },
    {
      sMenuItemCaption: "Disabled",
      component: (
        <div className="mt-2">
          <InActiveCustomers statusId={StatusEnums.Disabled} configFile={DisabledInActiveCustomerGridConfig} />
        </div>
      ),
    },
  ];

  return (
    <>
      <CustomerContext.Provider value={{ DataRef }}>
        <div className="main-inactive-grid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-md-12 col-12 other-info-tab">
              <CardSection
              //   cardTitle="Other Information"
              >
                <>
                  {tabs && tabs.length > 0 &&
                    <div className="row">
                      <div className="col-12">
                        <div className="tab-sub-section mb-0">
                          <div className="tab-sub-header">
                            {tabs && tabs.map((tab, index) => (
                              <button
                                key={index}
                                className={activeTab === index.toString() ? "active" : ""}
                                onClick={() => handleTabClick(index, tab.sPage)}
                              >
                                {tab.sMenuItemCaption}
                              </button>
                            ))}
                          </div>
                          {activeTab !== -1 && tabs[activeTab].component && (
                            <div className="tab-sub-content">
                              <div className="tab-sub-body-section">
                                {tabs[activeTab].component}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  }
                </>
              </CardSection>
            </div>
          </div>
        </div>
      </CustomerContext.Provider>
    </>
  );
};

export default InActiveCustomer;
