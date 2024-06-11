import React, { useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { useNavigate } from "react-router-dom";
import { AllInActiveCustomer } from "./AllInActiveCustomer";
import { FreezedInActiveCustomer } from "./FreezedInActiveCustomer";
import { BlockedInActiveCustomer } from "./BlockedInActiveCustomer";
import { DisabledInActiveCustomer } from "./DisabledInActiveCustomer";

const InActiveCustomer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex, navigationPath) => {
    setActiveTab(tabIndex);
    navigate(navigationPath);
  };

  const tabs = [
    {
      sMenuItemCaption: "All",
      component: (
        <div className="mt-2">
         <AllInActiveCustomer />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Freezed",
      component: (
        <div className="mt-2">
          <FreezedInActiveCustomer />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Blocked",
      component: (
        <div className="mt-2">
          <BlockedInActiveCustomer />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Disabled",
      component: (
        <div className="mt-2">
          <DisabledInActiveCustomer />
        </div>
      ),
    },

  ];

  return (
    <>
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
                              className={activeTab === index ? "active" : ""}
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
    </>
  );
};

export default InActiveCustomer;
