import React, { useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
// import { AppIcons } from "../../../../data/appIcons";
import FinancialSettings from "./features/FinancialSettings";
import ShippingSettings from "./features/ShippingSettings";
import "./SettingDetails.scss";

const SettingDetails = () => {
  const [activeTab, setActiveTab] = useState("0");
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex.toString());
  };
  const tabs = [
    {
      sMenuItemCaption: "Financial",
      component: (
        <div className="mt-4 financial-sec">
          <FinancialSettings />
        </div>
      ),
    },
    {
      sMenuItemCaption: "Shipping",
      component: (
        <div className="mt-4 financial-sec">
          <ShippingSettings />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="main-customer-grid setting-tab-sec">
        <CardSection>
          <div className="tab-section tab-2-section">
            {tabs && tabs.length > 0 && (
              <div className="row main-inactive-grid">
                <div className="col-12">
                  <div className="tab-sub-section mb-0">
                    <div className="tab-sub-header">
                      {tabs &&
                        tabs.map((tab, index) => (
                          <button
                            key={index}
                            className={
                              activeTab === index.toString() ? "active" : ""
                            }
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
            )}
          </div>
        </CardSection>
      </div>
      
    </>
  );
};

export default SettingDetails;
